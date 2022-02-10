/*eslint-disable*/
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from 'next/router';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import GetAppIcon from '@material-ui/icons/GetApp';
import LaunchIcon from '@material-ui/icons/Launch';
import MenuItem from '@material-ui/core/MenuItem';
import {useAuth0} from "@auth0/auth0-react";
// core components
import download from '../../@ronday/download';
import { OS } from '../Platform/Platform';

import { getOrganizations, setSelectedOrganizationId } from "../store/authSlice";

import styles from "../../assets/jss/ronday-material-dashboard/components/sidebarStyle";


export default function Sidebar(props) {
  const dispatch = useDispatch();
  // used for checking current route
  const router = useRouter();
  // creates styles for this component
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
  const token = useSelector((state) => state.auth.token);
  const organizations = useSelector((state) => state.auth.organizations);

  const {
    logout,
  } = useAuth0();
  // verifies if routeName is the one active (in browser input)
  function isActiveRoute(routeName) {
    return router.route.indexOf(routeName) > -1
  }

  const { color, logo, background, logoText, routes } = props;

  const [state, setState] = useState({
    style: selectedOrganizationId,
  })

  useEffect(() => {
    dispatch(getOrganizations(token));
  },[dispatch])


  function handleStyleChange(e) {
    setState({ ...state, style: e.target.value });
    dispatch(setSelectedOrganizationId(e.target.value));
    if (router.asPath.includes('/dashboard/spaces/editSpace')) {
      Router.push('/dashboard/spaces');
    }
  }

  function handleLogout() {
    localStorage.clear();
    logout();
  }

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        var activePro = " ";
        var listItemClasses;

        listItemClasses = classNames({
          [" " + classes[color]]: isActiveRoute(prop.layout + prop.path),
        });

        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]:
              isActiveRoute(prop.layout + prop.path)
        });

        return (
            prop.path === '/signout' ?
                <a className={activePro + classes.item} onClick={handleLogout}>
                  <ListItem button className={classes.itemLink + listItemClasses}>
                    {typeof prop.icon === "string" ? (
                        <Icon
                            className={classNames(classes.itemIcon, whiteFontClasses, {
                              [classes.itemIconRTL]: props.rtlActive,
                            })}
                        >
                          {prop.icon}
                        </Icon>
                    ) : (
                        <prop.icon
                            className={classNames(classes.itemIcon, whiteFontClasses, {
                              [classes.itemIconRTL]: props.rtlActive,
                            })}
                        />
                    )}
                    <ListItemText
                        primary={props.rtlActive ? prop.rtlName : prop.name}
                        className={classNames(classes.itemText, whiteFontClasses, {
                          [classes.itemTextRTL]: props.rtlActive,
                        })}
                        disableTypography={true}
                    />
                  </ListItem>
                </a> :
                <Link href={prop.layout + prop.path} key={key}>
                  <a className={activePro + classes.item}>
                    <ListItem button className={classes.itemLink + listItemClasses}>
                      {typeof prop.icon === "string" ? (
                          <Icon
                              className={classNames(classes.itemIcon, whiteFontClasses, {
                                [classes.itemIconRTL]: props.rtlActive,
                              })}
                          >
                            {prop.icon}
                          </Icon>
                      ) : (
                          <prop.icon
                              className={classNames(classes.itemIcon, whiteFontClasses, {
                                [classes.itemIconRTL]: props.rtlActive,
                              })}
                          />
                      )}
                      <ListItemText
                          primary={props.rtlActive ? prop.rtlName : prop.name}
                          className={classNames(classes.itemText, whiteFontClasses, {
                            [classes.itemTextRTL]: props.rtlActive,
                          })}
                          disableTypography={true}
                      />
                    </ListItem>
                  </a>
                </Link>
        );
      })}
    </List>
  );

  var brand = (
    <div className={classes.logo}>
      <a
        href="/dashboard/spaces"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
      >
        {logoText}
      </a>
    </div>
  );

  var select = (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        fullWidth
        value={state.style}
        onChange={handleStyleChange}
        className={classes.select}
      >

          {organizations?.map((_item, index) =>
              <MenuItem value={_item.organizationId} key={index} className={classes.typography}>{_item.displayName}</MenuItem>
          )}

      </Select>
    </FormControl>
  );

  var logoImage = (
    <div className={classes.logoImage}>
      <img src={organizations?.find(x => x.organizationId === selectedOrganizationId)?.logoUrl} />
    </div>
  );

  var Ronday = (
    <List className={classes.list}>
      <a className={classes.item} onClick={() => download()}>
        <ListItem button className={classes.itemDownload}>
          <GetAppIcon className={classNames(classes.itemIcon)} />
          <ListItemText
            primary="Download Ronday"
            className={classNames(classes.itemText)}
            disableTypography={true}
          />
        </ListItem>
      </a>
      {(OS(window) !== "Windows") ?
          <>
            <a href="rondayapp://" className={classes.item}>
              <ListItem button className={classes.itemDownload}>
                <LaunchIcon className={classNames(classes.itemIcon)} />
                <ListItemText
                    primary="Open Ronday"
                    className={classNames(classes.itemText)}
                    disableTypography={true}
                />
              </ListItem>
            </a>
          </> :
          <></>
      }
    </List>

  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          style={{ backgroundColor: background, boxShadow: 'rgba(0, 0, 0, 0.1)' }}
        >
          {brand}
          {select}
          {organizations?.find(x => x.organizationId === selectedOrganizationId)?.logoUrl? logoImage : <></>}
          <div className={classes.sidebarWrapper}>
            {links}
          </div>
          {Ronday}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          style={{ backgroundColor: background }}
        >
          {brand}
          {select}
          {organizations?.find(x => x.organizationId === selectedOrganizationId)?.logoUrl? logoImage : <></>}
          <div className={classes.sidebarWrapper} style={{ backgroundColor: background }}>{links}</div>
          {Ronday}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf([
    "white",
    "purple",
    "blue",
    "green",
    "orange",
    "red",
  ]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
