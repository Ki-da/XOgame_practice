import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { modeChange, setTitle } from './actions/setting';

const SettingForm = ({ modeChange, setTitle }) => (
  <div className="setting">
    <form>
      <div className="title-info">
        <label>Title : </label>
        <input name="title" type="text" defaultValue="クソゲー" onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="mode-info">
        <label>Mode : </label>
        <select defaultValue="normal" onChange={() => modeChange()}>
          <option value="normal">Normal</option>
          <option value="shit">Shit</option>
        </select>
      </div>
    </form>
  </div>
);

const mapStateToProps = state => ({
  setting: state.setting,
});

const mapDispatchToProps = dispatch => ({
  modeChange: () => dispatch(modeChange()),
  setTitle: title => dispatch(setTitle(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingForm);
