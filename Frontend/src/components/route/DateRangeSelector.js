import React, { useState } from "react";
import { DateRange } from "react-date-range";
// import { defaultStaticRanges } from "./defaultRanges";
import { format } from "date-fns";
import { Card, Form } from 'react-bootstrap';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import PropTypes from "prop-types";

const DateRangeSelector = (props, { ranges, onChange, onSubmit, ...rest }) => {

    let today = new Date();
    let hours = ('0' + today.getHours()).slice(-2);
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2);
    let timeString = hours + ':' + minutes;

    const [startTime, setStartTime] = useState(timeString);
    const [endTime, setEndTime] = useState(timeString);

    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    });

    const [show, setShow] = useState(true);

    const orientation = window.matchMedia("(max-width: 500px)").matches
        ? "vertical"
        : "horizontal";

    function formatDateDisplay(date, defaultText) {
        if (!date) return defaultText;
        return format(date, "yyyy-MM-dd");
    }

    const handleSelect = (ranges) => {
        setSelectedDateRange(ranges.selection);
        console.log(ranges.selection);
    };

    const onClickDone = () => {
         onSubmit(selectedDateRange);
        //  setShow(true);
    };

    const onClickClear = () => {
        setSelectedDateRange({
            startDate: new Date(),
            endDate: new Date(),
            key: "selection"
        });
    //    setShow(false);
    };

    return (
        <React.Fragment style={{ width: "80%" }}>
            <div className="shadow d-inline-block" style={{marginBottom:'20px'}}>
                <DateRange
                    onChange={handleSelect}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    color='#0d6efd'
                    rangeColors={['#0d6efd', 'red']}
                    ranges={[selectedDateRange]}
                    direction={orientation}
                    // orientation="horizontal"
                    autoFocus/>
                <div className="text-right position-relative rdr-buttons-position mt-2 mr-3" style={{ bottom: "0.3rem" }}>
                    <button
                        className="btn btn-transparent text-primary rounded-0 px-4 mr-2"
                        onClick={() => setShow(true)}
                    >
                        확인
                    </button>
                    <button
                        className="btn btn-transparent text-danger rounded-0 px-4"
                        onClick={onClickClear}
                    >
                        초기화
                    </button>
                </div>
            </div>

            {show && (
                <div className="h-100 mt-3 alert alert-transparent" direction={orientation}>
                    <h6><strong>⏰ 를 눌러서 시간을 조정할 수 있어요!</strong></h6>

                    <Card className='basicCard' key={"key"} style={{ display: "inline-block", margin: "2%", marginBottom: "3%", padding: "4%", border: "none", borderRadius: "20px", boxShadow: "1px 1px 4px 0px gray" }}>
                        <h5>
                            시작 일시
                        </h5>
                        <div style={{ fontWeight: "bold", marginTop: "2%", float: "left" }}>
                            {
                                props.startDateHandler(formatDateDisplay(selectedDateRange.startDate))
                            }
                            {formatDateDisplay(selectedDateRange.startDate)}
                            <Form.Control type="time"
                                style={{ marginBottom: "1%", background: "rgba(0,0,0,0)", color: "black", border: "none", boxShadow: "none", display: "inline-block" }}
                                onChange={(e) => props.startTimeHandler(e.target.value)} defaultValue={timeString} />
                        </div>
                    </Card>
                    <Card className='basicCard' key={"key"} style={{ display: "inline-block", margin: "2%", marginBottom: "3%", padding: "4%", border: "none", borderRadius: "20px", boxShadow: "1px 1px 4px 0px gray" }}>
                        <h5>
                            마감 일시
                        </h5>
                        <div style={{ fontWeight: "bold", marginTop: "2%", float: "left" }}>
                            {
                                props.endDateHandler(formatDateDisplay(selectedDateRange.endDate))
                            }
                            {formatDateDisplay(selectedDateRange.endDate)}
                            <Form.Control type="time"
                                style={{ marginBottom: "1%", background: "rgba(0,0,0,0)", color: "black", border: "none", boxShadow: "none", display: "inline-block" }}
                                onChange={(e) => props.endTimeHandler(e.target.value)} defaultValue={timeString} />
                        </div>
                    </Card>
                    {/* <button
            className="mb-1 btn btn-transparent text-danger"
            onClick={() => setShow(false)}
            variant="outline-success"
          >
            {" "}
            Close
          </button> */}
                </div>

            )}
        </React.Fragment>
    );
};

// DateRangeSelector.defaultProps = {
//   ranges: defaultStaticRanges
// };

DateRangeSelector.propTypes = {
    /**
     * On Submit
     */
    onSubmit: PropTypes.func
};

export { DateRangeSelector };
