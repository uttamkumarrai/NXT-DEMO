import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const TripHireContract=()=>{
return(
    <Box>
    <Tabs variant="fullWidth" value={selectedTab} onChange={handleChange} indicatorColor="primary" textColor="primary">
            <Tab label="Customer Commercial" style={selectedTab === 0 ? selectedTabStyle : tabStyle} />
            <Tab label="Vendor Commercial" style={selectedTab === 1 ? selectedTabStyle : tabStyle} />
            <Tab label="Own Fleet" style={selectedTab === 2 ? selectedTabStyle : tabStyle} />
          </Tabs>
          </Box>
)


}
export default TripHireContract;
