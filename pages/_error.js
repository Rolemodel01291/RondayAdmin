import React from "react";
import Router from "next/router";
import {useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import Input from "@material-ui/core/Input";


function Error({ statusCode }) {
  const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
  const handle = () => {
    if (selectedOrganizationId) {
        Router.push('/dashboard/spaces');
    } else {
        Router.push('/onboarding');
    }
  }
  return (
      <div className="flex flex-col flex-1 items-center justify-center p-16">
          <div className="max-w-512 text-center">

              <Typography variant="h1" color="inherit" className="font-medium mb-16">
                  {statusCode}
              </Typography>

              <Typography variant="h5" color="textSecondary" className="mb-16">
                  Sorry but we could not find the page you are looking for.
              </Typography>

              <Paper className="flex items-center w-full h-56 p-16 mt-48 mb-16 shadow">
                  <SearchIcon color="action"/>
                  <Input
                      placeholder="Search for anything"
                      className="px-16"
                      disableUnderline
                      fullWidth
                      inputProps={{
                          'aria-label': 'Search'
                      }}
                  />
              </Paper>

              <a className="font-medium cursor-pointer" onClick={() => handle()}>
                  {selectedOrganizationId? "Go back to dashboard" : "Go back to onboarding"}
              </a>
          </div>
      </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error