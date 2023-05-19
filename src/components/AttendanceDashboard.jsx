import React, { useState } from 'react';
import AttendanceContext from '../context/attendanceContext';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import ShareLocation from './share-location/ShareLocation';
import ClockIn from './clock-in/ClockIn';
import WorkingOn from './working-on/WorkingOn';
import ClockOut from './clock-out/ClockOut';

import initialAttendanceData from '../data';

// import AttendanceDashboardStyles from "./AttendanceDashboardStyles.module.css";

const AttendanceDashboard = () => {

    const [Attendance, setAttendance] = useState(initialAttendanceData);
    const value = { Attendance, setAttendance };

    const [step, setstep] = useState(1);

    const handleClick = (stepDirection) => {

        if (stepDirection.moveTowards === 'Next' ) {
            setstep(step + 1);
        }
        else if (stepDirection.moveTowards === 'Previous' ) {
            setstep(step - 1);
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AttendanceContext.Provider value={value}>
                <Container maxWidth="lg">
                    <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
                        <Grid container justifyContent="center">
                            <Grid item xs={12}>
                                {(() => {
                                    switch (step) {
                                        case 1:
                                            return <ShareLocation handleClick={handleClick} />
                                        case 2:
                                            return <ClockIn handleClick={handleClick} />
                                        case 3:
                                            return <WorkingOn handleClick={handleClick} />
                                        case 4:
                                            return <ClockOut handleClick={handleClick} />
                                        default:
                                            return null
                                    }
                                })()}
                            </Grid>
                        </Grid>
                    </Box>

                </Container>
            </AttendanceContext.Provider>

        </React.Fragment>
    )
}

export default AttendanceDashboard;