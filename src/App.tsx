import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { Posts } from "./components/Posts/Posts"


function App() {
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Social Media App
          </Typography>
        </Toolbar>
      </AppBar>
      <Posts />
    </Box>
  )
}

export default App
