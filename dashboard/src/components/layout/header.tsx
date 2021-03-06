import { Login, Logout, SettingsApplications } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import { Component, ComponentClass, Fragment, ReactNode } from "react";
import { TransProps, withTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { AuthContext } from "../../context";
import { AppBar } from "../styled";

interface State {
  userMenuAnchor: null | HTMLElement;
}
type Props = RouteComponentProps & TransProps<any>;

class HeaderBase extends Component<Props, State> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      userMenuAnchor: null,
    };
  }

  render(): ReactNode {
    const t = this.props.t!;
    return (
      <AppBar>
        <Toolbar>
          <Button color={"inherit"} component={Link} to={"/"}>
            <Avatar sx={{ mr: ".5rem" }} src={"/logo192.png"} />
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ textTransform: "none" }}
            >
              VeniBot
            </Typography>
          </Button>
          <Typography sx={{ flexGrow: 1 }} />
          <Stack
            direction="row"
            spacing={1}
            sx={{ pr: ".75rem", display: { xs: "none", md: "flex" } }}
          >
            <Button
              color="inherit"
              href={process.env.REACT_APP_STATUS_URL}
              disabled={!Boolean(process.env.REACT_APP_STATUS_URL)}
            >
              {t("status")}
            </Button>
            <Button
              color="inherit"
              href={process.env.REACT_APP_DOCS_URL}
              disabled={!Boolean(process.env.REACT_APP_DOCS_URL)}
            >
              {t("docs")}
            </Button>
            <Button color="inherit" component={Link} to={"/commands"}>
              {t("commands")}
            </Button>
            <Button
              href={
                new URL("/auth/support", process.env.REACT_APP_API_URL).href
              }
              color="inherit"
            >
              {t("support")}
            </Button>
          </Stack>
          <AuthContext.Consumer>
            {({ user, logout }): ReactNode => (
              <Fragment>
                {user ? (
                  <>
                    <IconButton
                      onClick={({ currentTarget }) =>
                        this.setState({ userMenuAnchor: currentTarget })
                      }
                      sx={{ p: 0 }}
                    >
                      <Avatar
                        alt={user.username}
                        src={`https://cdn.discordapp.com/avatars/${user.id}/${
                          user.avatar
                        }.${user.avatar.startsWith("a_") ? "gif" : "webp"}`}
                      />
                    </IconButton>
                    <Menu
                      anchorEl={this.state.userMenuAnchor}
                      keepMounted
                      open={Boolean(this.state.userMenuAnchor)}
                      onClose={() => this.setState({ userMenuAnchor: null })}
                      onClick={() => this.setState({ userMenuAnchor: null })}
                      PaperProps={{
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            backgroundImage:
                              "linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12))",
                            backgroundColor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <ListItem
                        alignItems="flex-start"
                        sx={{ borderStyle: "none" }}
                      >
                        <ListItemAvatar sx={{ mt: "4px" }}>
                          <Avatar
                            alt={user.username}
                            sx={{ width: "48px", height: "48px" }}
                            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.username}
                          secondary={`${user.username}#${user.discriminator}`}
                          sx={{ pl: "4px" }}
                        />
                      </ListItem>
                      <Divider sx={{ my: "0.5rem" }} />
                      <ListItem
                        sx={{
                          justifyContent: "center",
                          padding: "0 .5rem",
                        }}
                      >
                        <Stack direction="row" spacing={1}>
                          <Button
                            color="inherit"
                            sx={{ mr: ".5rem" }}
                            startIcon={<SettingsApplications />}
                            component={Link}
                            to={"/servers"}
                          >
                            {t("myServers")}
                          </Button>
                          <Button
                            onClick={() => {
                              logout();
                              this.props.history.push("/");
                            }}
                            color="error"
                            startIcon={<Logout />}
                          >
                            {t("logout")}
                          </Button>
                        </Stack>
                      </ListItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    color={"inherit"}
                    href={new URL("/auth", process.env.REACT_APP_API_URL).href}
                    endIcon={<Login />}
                  >
                    {t("login")}
                  </Button>
                )}
              </Fragment>
            )}
          </AuthContext.Consumer>
        </Toolbar>
      </AppBar>
    );
  }
}

export const Header = compose(
  withRouter,
  withTranslation("components/header")
)(HeaderBase) as ComponentClass;
