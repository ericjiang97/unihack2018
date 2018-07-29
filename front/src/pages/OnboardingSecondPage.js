import React, { Component } from 'react'
import {
  Button,
  Typography,
  FormControl,
  Divider,
} from '@material-ui/core'
import { connect } from 'react-redux'
import Fade from '@material-ui/core/Fade'
import RadioPsychTest from "../components/RadioPsychTest";

class OnboardingFirstPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        positive_consec_meetings: null,
        positive_late_lunch: null,
        positive_leave_early: null,
        negative_no_lunch: null,
        positive_arrive_late: null,
        negative_late_meeting: null,
        negative_late_arrival: null,
        negative_leave_early: null,
        positive_early_lunch: null,
        negative_working_lunch: null,
        positive_low_context_switch: null
    };
  }
  render() {
    const { account } = this.props;
    const { isAuth, user } = account;
    return (
      <div
        style={{
          flex: 1,
          backgroundImage:
            "linear-gradient(to top, rgba(46, 49, 65, 0.5), rgba(46, 49, 65, 0.5)),url('https://img.etsystatic.com/il/4e5483/1163107550/il_fullxfull.1163107550_cpzr.jpg?version=0')",

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          padding: 10,
        }}
      >
        <Fade in={true} timeout={1500}>
          <header className="App-header">
            <Typography
              variant="display1"
              gutterBottom
              style={{ color: 'white' }}
            >
              First a bit about you...
            </Typography>
          </header>
        </Fade>
        <div>
          <Fade in={true} timeout={1500}>
            <Typography
              variant="subheading"
              gutterBottom
              style={{ color: 'white', fontSize: "110%"}}
            >
              <p>
                Let us help you make the best of your events on your calendar.
                Whether it's conferences, meetings with execs, etc.
              </p>
              <p>
                How do the following statements describe how <b>you</b> manage your timetable?
              </p>
            </Typography>
          </Fade>
        </div>
        <Divider />
        <div style={{top: "4px", position: "relative"}}>
          <Fade in={true} timeout={1750}>
              <FormControl required={Object.values(this.state).filter(i => i != null).length === Object.values(this.state).length}>
                  <RadioPsychTest name={"I'm most effective when I get a break between consecutive meetings, to recharge and prepare for the next meeting"}
                                  value={this.state.positive_consec_meetings}
                                  onChange={(val) => this.setState({positive_consec_meetings: val})}/>

                  <RadioPsychTest name={"I'm OK with a late lunch"}
                                  value={this.state.positive_late_lunch}
                                  onChange={val => this.setState({positive_late_lunch: val})}/>

                  <RadioPsychTest name={"I'm OK with sometimes leaving meetings early"}
                                  value={this.state.positive_leave_early}
                                  onChange={val => this.setState({positive_leave_early: val})}/>

                  <RadioPsychTest name={"I rarely take working lunches"}
                                  value={this.state.negative_no_lunch}
                                  onChange={val => this.setState({negative_no_lunch: val})}/>

                  <RadioPsychTest name={"I don't mind missing the start of some meetings"}
                                  value={this.state.negative_late_arrival}
                                  onChange={val => this.setState({negative_late_arrival: val})}/>

                  <RadioPsychTest name={"I hate being late to meetings"}
                                  value={this.state.negative_late_meeting}
                                  onChange={val => this.setState({negative_late_meeting: val})}/>

                  <RadioPsychTest name={"I believe the most important part of the meeting is near the end"}
                                  value={this.state.negative_leave_early}
                                  onChange={val => this.setState({negative_leave_early: val})}/>

                  <RadioPsychTest name={"I sometimes have early lunches"}
                                  value={this.state.positive_early_lunch}
                                  onChange={val => this.setState({positive_early_lunch: val})}/>

                  <RadioPsychTest name={"I require a break while I eat my lunch"}
                                  value={this.state.negative_working_lunch}
                                  onChange={val => this.setState({negative_working_lunch: val})}/>

                  <RadioPsychTest name={"I like to cluster all my meetings one after another"}
                                  value={this.state.positive_low_context_switch}
                                  onChange={val => this.setState({positive_low_context_switch: val})}/>
              </FormControl>
            {/*<div>*/}
              {/*<Typography variant="title" gutterBottom style={{ color: 'white' }}>*/}
                {/*Consecutive events*/}
              {/*</Typography>*/}
              {/*<Typography*/}
                {/*variant="subheading"*/}
                {/*gutterBottom*/}
                {/*style={{ color: 'white' }}*/}
              {/*>*/}
                {/*When you have Consecutive (or back-to-back events), would you*/}
                {/*prefer:*/}
              {/*</Typography>*/}
              {/*<ul>*/}
                {/*<li>Leave previous event early</li>*/}
                {/*<li>Arrive next event late</li>*/}
              {/*</ul>*/}

              {/*<FormControl>*/}
                {/*<InputLabel htmlFor="name-readonly">Name</InputLabel>*/}
                {/*<Select*/}
                  {/*value={this.state.consecutiveMeetings}*/}
                  {/*onChange={event => {*/}
                    {/*this.setState({*/}
                      {/*consecutiveMeetings: event.target.value,*/}
                    {/*})*/}
                  {/*}}*/}
                  {/*input={*/}
                    {/*<Input*/}
                      {/*name="Select a choice"*/}
                      {/*id="name-readonly"*/}
                      {/*style={{ color: 'white' }}*/}
                    {/*/>*/}
                  {/*}*/}
                {/*>*/}
                  {/*<MenuItem value="before">Leave event early</MenuItem>*/}
                  {/*<MenuItem value="after">Arrive next event late</MenuItem>*/}
                {/*</Select>*/}
              {/*</FormControl>*/}
              {/*<Divider style={{ marginBottom: 10 }} />*/}
              {/*<Typography variant="title" gutterBottom style={{ color: 'white' }}>*/}
                {/*Leave half way for longer events*/}
              {/*</Typography>*/}
              {/*<Typography*/}
                {/*variant="subheading"*/}
                {/*gutterBottom*/}
                {/*style={{ color: 'white' }}*/}
              {/*>*/}
                {/*When you have an event for the whole day, and another important*/}
                {/*event in the middle of the day, would you like to accept both*/}
                {/*events:*/}
              {/*</Typography>*/}
              {/*<FormControl>*/}
                {/*<InputLabel htmlFor="acceptBothEvents">Select one:</InputLabel>*/}
                {/*<Select*/}
                  {/*value={this.state.acceptBothEvents}*/}
                  {/*onChange={event => {*/}
                    {/*this.setState({*/}
                      {/*acceptBothEvents: event.target.value,*/}
                    {/*})*/}
                  {/*}}*/}
                  {/*input={*/}
                    {/*<Input*/}
                      {/*name="Select a choice"*/}
                      {/*id="acceptBothEvents"*/}
                      {/*style={{ color: 'white' }}*/}
                    {/*/>*/}
                  {/*}*/}
                {/*>*/}
                  {/*<MenuItem value="both">Accept both events</MenuItem>*/}
                  {/*<MenuItem value="reject">Reject both events</MenuItem>*/}
                  {/*<MenuItem value="decide">Prompt me to decide</MenuItem>*/}
                {/*</Select>*/}

              {/*</FormControl>*/}
            {/*</div>*/}
          </Fade>
        </div>
        <Fade in={true} timeout={2200}>
          <Button variant="raised" color="primary" href="./final">
            Submit
          </Button>
        </Fade>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account,
});
export default connect(mapStateToProps)(OnboardingFirstPage)
