import { connect } from 'react-redux';

import * as React from 'react';

import * as actions from '../actions';

import Topics from '../components/Topics';

import reduxUndo from '../managers/reduxundo';

const reducerKey = 'topics';

const mapStateToProps = (state) => {
  return state.topics;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateTitle : (id, title) => {
      dispatch(actions.updateTopicTitle(id, title));
    },

    onUpdateFontSize : (id, fontSize) => {
      dispatch(actions.updateTopicFontSize(id, fontSize));
    },

    onUpdateFontColor : (id, fontColor) => {
      dispatch(actions.updateTopicFontColor(id, fontColor));
    },

    onUpdateIsFontBold : (id, isFontBold) => {
      dispatch(actions.updateTopicIsFontBold(id, isFontBold));
    },

    onUpdateIsFontItalic : (id, isFontItalic) => {
      dispatch(actions.updateTopicIsFontItalic(id, isFontItalic));
    },

    onUpdateIsFontLineThrough : (id, isFontLineThrough) => {
      dispatch(actions.updateTopicIsFontLineThrough(id, isFontLineThrough));
    },

    onUpdateFillColor : (id, fillColor) => {
      dispatch(actions.updateTopicFillColor(id, fillColor));
    },

    onUpdateShapeClass: (id, shapeClass) => {
      dispatch(actions.updateTopicShapeClass(id, shapeClass));
    },

    onUpdateLineClass: (id, lineClass) => {
      dispatch(actions.updateTopicLineClass(id, lineClass));
    },

    onUpdateLabel: (id, labelText) => {
      dispatch(actions.updateTopicLabel(id, labelText));
    },

    onAddChildTopic : (id, childInfo, index) => {
      dispatch(actions.addChildTopic(id, childInfo, index));
    },

    onAddParentTopic : (id, parentId) => {
      dispatch(actions.addParentTopic(id, parentId));
    },

    onRemoveSelfTopic : (id) => {
      dispatch(actions.removeSelfTopic(id));
    }
  }
};


const TopicsContainer = connect(mapStateToProps, reduxUndo(mapDispatchToProps, reducerKey))(Topics);

export default TopicsContainer;