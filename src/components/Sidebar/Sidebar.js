/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse';
import Icon from "@material-ui/core/Icon";


import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    if(routeName.indexOf('undefined') < 0)
    {
      return window.location.href.indexOf(routeName) > -1 ? true : false;
    }
    return;
  }
  const { color, logo, image, logoText, routes } = props;


  const handleClick = (k, component) => {
    console.log("click sidebar", k);
    if (component!=undefined)  {props.handleDrawerToggle();}
      for(var i=0; i<routes.length;i++){
        if (i==k)
        {
          routes[i].open=!routes[i].open;
        }else{
          routes[i].open=false;
        }
        
      }
  };

  
  var links = (
    <List className={classes.list} >
      {routes.map((prop, key) => {
            var activePro = " ";
            var listItemClasses;
            let yek="i"+key.toString();
             listItemClasses = classNames({
                [" " + classes[color]]: activeRoute(prop.layout + prop.path)
              });
            const whiteFontClasses = classNames({
              [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
            });
            return (
              <div  key={yek}>
                <NavLink
                  to={prop.layout + prop.path}
                  className={activePro + classes.item}
                  activeClassName="active"
                  key={key}
                >
                  <ListItem button onClick={(e) => handleClick(key, prop.component, e)}>
                    {typeof prop.icon === "string" ? (
                      <Icon
                        className={classNames(classes.itemIcon, whiteFontClasses, {
                          [classes.itemIconRTL]: props.rtlActive
                        })}
                      >
                        {prop.icon}
                      </Icon>
                    ) : (
                      <prop.icon
                        className={classNames(classes.itemIcon, whiteFontClasses, {
                          [classes.itemIconRTL]: props.rtlActive
                        })}
                      />
                    )}
                    <ListItemText primary={prop.name}  
                      className={classNames(classes.itemText, whiteFontClasses, {
                      [classes.itemTextRTL]: props.rtlActive
                    })}/>
                  </ListItem>
                </NavLink>
                {prop.items === undefined ? 
                  (
                    <div/>
                  )  :   (
                    <Collapse in={prop.open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding >
                      {
                        prop.items.map((pi,index) => {
                          let k=key.toString() + index.toString();
                          console.log(k,pi.layout + pi.path);
                          return(
                            <NavLink
                                to={pi.layout + pi.path}
                                className={activePro + classes.item}
                                activeClassName="active"
                                key={k}
                            >
                              <ListItem button className={classes.nested}  key={index}   onClick={(e) => handleClick(-1, pi.component, e)}>
                                  {typeof prop.icon === "string" ? (
                                      <Icon
                                        className={classNames(classes.itemIcon, whiteFontClasses, )}
                                      >
                                        {prop.icon}
                                      </Icon>
                                    ) : (
                                      <pi.icon
                                        className={classNames(classes.itemIcon, whiteFontClasses )}
                                      />
                                    )
                                  }
                                  <ListItemText primary={ pi.name}  />
                              </ListItem>
                            </NavLink>
                          );
                        })
                      }
                      </List>
                    </Collapse>
                  )
                }
              </div>
            )
      })}
    </List>
  );
  
  var brand = (
    <div className={classes.logo}>
      <a
        href="http://www.bostoncred.com.ar"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        target="_blank"
      >
         <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
      </a>
    </div>
  );
  return (
    <div>
      <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
