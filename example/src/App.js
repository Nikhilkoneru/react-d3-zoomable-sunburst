import React, {useEffect, useState} from 'react'
import './App.css';
import Sunburst from 'react-d3-zoomable-sunburst';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import json from "./data";
const styles = {
  container: {
    flexGrow: 1
  },
  innerContainer: {
    flexGrow: 1,
    marginTop: 5,
    height: "100%"
  },
  body: {
    position: "absolute",
    width: "97%",
    display: "flex",
    margin: 20
  },
  header: {
    height: "100%",
    width: "97%",
    margin: 20
  },
  headerPadding: {
    padding: 10,
    paddingBottom: 5
  },
  paddingDiv: {paddingTop: 30},
}

function App() {
  const [data, setData] = useState({
    data: {},
    criteria: "minSize",
  })


  useEffect(() => {
    setData({...data, data: json})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = (event) => {
    setData({...data, criteria: event.target.value})
  }
  return (
      <Grid container style={styles.container} spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper elevation={3} style={styles.header}>
            <Grid container style={styles.innerContainer} spacing={2}>
              <Grid item xs={12} md={6} lg={6} style={styles.paddingDiv}>
                <Typography variant="h5" gutterBottom style={styles.headerPadding}>
                  React-d3-zoomable-sunburst example
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={6} style={styles.paddingDiv}>
                <FormControl variant="outlined" style={styles.formControl}>
                  <InputLabel htmlFor="criteria">Criteria</InputLabel>
                  <Select
                      labelId="criteria"
                      id="criteria"
                      value={data.criteria}
                      onChange={submit}
                      label="criteria"
                  >
                    <MenuItem value={"minSize"}>minSize</MenuItem>
                    <MenuItem value={"size"}>Size</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Paper elevation={3} style={styles.body}>
            <Sunburst
                data={data.data}
                scale="exponential"
                tooltipContent={ <div class="sunburstTooltip" style="position:absolute; color:'black'; z-index:10; background: #e2e2e2; padding: 5px; text-align: center;" /> }
                tooltip
                tooltipPosition="right"
                keyId="Sunburst"
                width={window.innerWidth * 0.8}
                value={data.criteria}
                height={window.innerHeight * 0.8}
            />
          </Paper>
        </Grid>
      </Grid>
  );
}

export default App;
