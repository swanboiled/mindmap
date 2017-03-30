import * as React from 'react'
import { connect } from 'dva'
import { events, selectionsManager } from 'src/managers'
import * as WidgetGenerator from './widgetgenerator'
import * as EventTags from 'src/constants/EventTags'
import * as CommonConstant from 'src/constants/Common'
import { topicInfo, mapState } from 'src/interface'
import { Button } from '../antd'

const AddChildTopicButton = WidgetGenerator.buttonGenerator('Add Child Topic', 'onAddChildTopic');

const AddTopicBeforeButton = WidgetGenerator.buttonGenerator('Add Topic Before', 'onAddTopicBefore');

const AddTopicAfterButton = WidgetGenerator.buttonGenerator('Add Topic After', 'onAddTopicAfter');

const AddParentTopicButton = WidgetGenerator.buttonGenerator('Add Parent Topic', 'onAddParentTopic');

const RemoveTopicButton = WidgetGenerator.buttonGenerator('Remove Topic', 'onRemoveSelfTopic');

const UpdateFontSizeSelector = WidgetGenerator.selectorGenerator('Font Size', 'onUpdateFontSize', {
  '8px': '8', '9px': '9', '10px': '10', '11px': '11', '12px': '12', '13px': '13', '14px': '14', '16px': '16',
  '18px': '18', '20px': '20', '22px': '22', '24px': '24', '36px': '36', '48px': '48', '56px': '56'
});

const UpdateFontColorPicker = WidgetGenerator.colorPickerGenerator('Font Color', 'onUpdateFontColor');

const UpdateIsFontBoldCheckBox = WidgetGenerator.checkBoxGenerator('Bold', 'onUpdateIsFontBold');

const UpdateIsFontItalicCheckBox = WidgetGenerator.checkBoxGenerator('Italic', 'onUpdateIsFontItalic');

const UpdateIsFontLineThroughCheckBox = WidgetGenerator.checkBoxGenerator('Line Through', 'onUpdateIsFontLineThrough');

const UpdateShapeClassSelector = WidgetGenerator.selectorGenerator('Shape Class', 'onUpdateShapeClass', {
  [CommonConstant.SHAPE_RECT]: 'Rect',
  [CommonConstant.SHAPE_ROUNDED_RECT]: 'Rounded Rectangle',
  [CommonConstant.SHAPE_PARALLELOGRAM]: 'Parallelogram'
});

const UpdateStrokeWidthSelector = WidgetGenerator.selectorGenerator('Border Width', 'onUpdateStrokeWidth', {
  [CommonConstant.STROKE_WIDTH_NONE]: 'None',
  [CommonConstant.STROKE_WIDTH_THIN]: 'Thin',
  [CommonConstant.STROKE_WIDTH_MIDDLE]: 'Middle',
  [CommonConstant.STROKE_WIDTH_FAT]: 'Fat'
});

const UpdateStrokeColorPicker = WidgetGenerator.colorPickerGenerator('Border Color', 'onUpdateStrokeColor');

const UpdateLineClassSelector = WidgetGenerator.selectorGenerator('Line Class', 'onUpdateLineClass', {
  [CommonConstant.LINE_NONE]: 'None',
  [CommonConstant.LINE_RIGHT_ANGLE]: 'Right Angle',
  [CommonConstant.LINE_ROUNDED]: 'Rounded'
});

const UpdateLineWidthSelector = WidgetGenerator.selectorGenerator('Line Width', 'onUpdateLineWidth', {
  [CommonConstant.LINE_WIDTH_NONE]: 'None',
  [CommonConstant.LINE_WIDTH_THIN]: 'Thin',
  [CommonConstant.LINE_WIDTH_MIDDLE]: 'Middle',
  [CommonConstant.LINE_WIDTH_FAT]: 'Fat'
});

const UpdateLineColorPicker = WidgetGenerator.colorPickerGenerator('Line Color', 'onUpdateLineColor');

const UpdateFillColorPicker = WidgetGenerator.colorPickerGenerator('Fill Color', 'onUpdateFillColor');

const UpdateLabelTextInput = WidgetGenerator.textInputGenerator('Label Text', 'onUpdateLabel');

interface TopicEditPanelProps {
  selectionList: Array<topicInfo>
  dispatch: Function
}

interface TopicEditPanelState {
  show?: boolean;
  isTargetRoot?: boolean;

  fontSize?: string;
  fontColor?: string;
  isFontBold?: boolean;
  isFontItalic?: boolean;
  isFontLineThrough?: boolean;

  shapeClass?: string;
  fillColor?: string;
  strokeWidth?: string;
  strokeColor?: string;

  lineClass?: string;
  lineWidth?: string;
  lineColor?: string;

  labelText?: string;
}

class TopicEditPanel extends React.Component<TopicEditPanelProps, TopicEditPanelState> {
  constructor(props: TopicEditPanelProps) {
    super();

    this.setStateBySelectionList(props.selectionList);
  }

  static defaultProps = {
    selectionList: []
  };

  componentDidMount() {
    // todo 
    events.on(EventTags.UNDO_OR_REDO_TRIGGERED, () => {
      if (!this.state.show) return;

      const selections = selectionsManager.getSelectionsArray();
      this.setPanelWidgetValue(selections[selections.length - 1].props.topicInfo);
    });
  }

  componentWillReceiveProps(nextProps: TopicEditPanelProps) {
    // reset state while selection list changed
    this.setStateBySelectionList(nextProps.selectionList);
  }

  /**
   * @description set state according to current selected topics
   * @param selectionList current selected topics
   * */
  setStateBySelectionList(selectionList: Array<topicInfo>) {
    if (!selectionList.length) return;

    // todo 先根据最后列表中最后的一个topic来确定样式
    const topicInfoToSetStyle = selectionList[selectionList.length - 1];
    const styleToSet = topicInfoToSetStyle.style;

    this.state = {
      fontSize: styleToSet.fontSize,
      fontColor: styleToSet.fontColor,
      isFontBold: styleToSet.isFontBold,
      isFontItalic: styleToSet.isFontItalic,
      isFontLineThrough: styleToSet.isFontLineThrough,

      shapeClass: styleToSet.shapeClass,
      fillColor: styleToSet.fillColor,
      strokeWidth: styleToSet.strokeWidth,
      strokeColor: styleToSet.strokeColor,

      lineClass: styleToSet.lineClass,
      lineWidth: styleToSet.lineWidth,
      lineColor: styleToSet.lineColor,

      labelText: topicInfoToSetStyle.label || '',

      // todo
      isTargetRoot: false
    }
  }

  /**
   * @description the operator button for editing topic tree
   */
  renderTreeEditWidgetArea() {

    const addChildTopicBtnProps = {
      type: 'primary',
      onClick: () => this.props.dispatch({ type: 'map/addChildTopic' })
    };

    const addTopicBeforeBtnProps = {
      type: 'primary',
      onClick: () => this.props.dispatch({ type: 'map/addTopicBefore' })
    };

    const addTopicAfterBtnProps = {
      type: 'primary',
      onClick: () => this.props.dispatch({ type: 'map/addTopicAfter' })
    };

    const addParentTopicBtnProps = {
      type: 'primary',
      onClick: () => this.props.dispatch({ type: 'map/addParentTopic' })
    };

    const removeTopicBtnProps = {
      type: 'danger',
      onClick: () => this.props.dispatch({ type: 'map/removeTopic' })
    };

    return (
      <div>
        <Button {...addChildTopicBtnProps}>Add Child Topic</Button>
        <Button {...addTopicBeforeBtnProps}>Add Topic Before</Button>
        <Button {...addTopicAfterBtnProps}>Add Topic After</Button>
        <Button {...addParentTopicBtnProps}>Add Parent Topic</Button>
        <Button {...removeTopicBtnProps}>Remove Topic</Button>
      </div>
    )
  }

  render() {

    if (!this.props.selectionList.length) return <div />;

    const panelProps = {
      className: 'edit-panel topic-edit-panel',
    };

    const updateLabelProps = {
      value: this.state.labelText,
      onChange: e => this.setState({ labelText: e.target.value }),
      onBlur: e => this.dispatchOperator(e),
      onKeyDown: e => {
        const which = e.which;
        which === 13 && this.dispatchOperator(e);
      }
    };

    return (
      <div { ...panelProps } >
        { this.renderTreeEditWidgetArea() }
        <hr />
        <UpdateFontSizeSelector {...this.generateNormalProps('fontSize') } />
        <UpdateFontColorPicker {...this.generateColorPickerProps('fontColor') } />
        <UpdateIsFontBoldCheckBox {...this.generateCheckBoxProps('isFontBold') } />
        <UpdateIsFontItalicCheckBox {...this.generateCheckBoxProps('isFontItalic') } />
        <UpdateIsFontLineThroughCheckBox {...this.generateCheckBoxProps('isFontLineThrough') } />
        <hr />
        <UpdateShapeClassSelector {...this.generateNormalProps('shapeClass') } />
        <UpdateFillColorPicker {...this.generateColorPickerProps('fillColor') } />
        <UpdateStrokeWidthSelector {...this.generateNormalProps('strokeWidth') } />
        <UpdateStrokeColorPicker {...this.generateColorPickerProps('strokeColor') } />
        <hr />
        <UpdateLineClassSelector {...this.generateNormalProps('lineClass') } />
        <UpdateLineWidthSelector {...this.generateNormalProps('lineWidth') } />
        <UpdateLineColorPicker {...this.generateColorPickerProps('lineColor') } />
        <hr />
        <UpdateLabelTextInput {...updateLabelProps} />
      </div>
    );
  }

  generateColorPickerProps(stateKey) {
    return {
      value: this.state[stateKey],
      onChange: (id, color) => {
        selectionsManager.getSelectionsArray().forEach((component) => {
          component[id](color);
        });
        this.setState({
          [stateKey]: color
        });
      }
    }
  }

  generateNormalProps(stateKey) {
    return {
      value: this.state[stateKey],
      onChange: e => this.dispatchOperator(e, stateKey)
    };
  }

  generateCheckBoxProps(stateKey) {
    return {
      checked: this.state[stateKey],
      onClick: e => {
        const widgetId = e.target.id;
        const checked = e.target.checked;

        selectionsManager.getSelectionsArray().forEach((component) => {
          component[widgetId](checked);
        });

        this.setState({
          [stateKey]: checked
        });
      }
    }
  }

  dispatchOperator(e, syncValue?, operatorTargetArray = selectionsManager.getSelectionsArray()) {
    const widgetId = e.target.id;
    const widgetValue = e.target.value;

    operatorTargetArray.forEach((component) => {
      component[widgetId](widgetValue);
    });

    if (syncValue) {
      this.setState({
        [syncValue]: widgetValue
      });
    }
  }

  setPanelWidgetValue(topicInfo) {
    let isTargetRoot; {
      const selections = selectionsManager.getSelectionsArray();
      if (selections.length === 1 && selections[0].props.topicInfo.type === CommonConstant.TOPIC_ROOT) {
        isTargetRoot = true;
      }
    }

    const topicStyle = topicInfo.style;

    this.setState({
      fontSize: topicStyle.fontSize,
      fontColor: topicStyle.fontColor,
      isFontBold: topicStyle.isFontBold,
      isFontItalic: topicStyle.isFontItalic,
      isFontLineThrough: topicStyle.isFontLineThrough,

      shapeClass: topicStyle.shapeClass,
      fillColor: topicStyle.fillColor,
      strokeWidth: topicStyle.strokeWidth,
      strokeColor: topicStyle.strokeColor,

      lineClass: topicStyle.lineClass,
      lineWidth: topicStyle.lineWidth,
      lineColor: topicStyle.lineColor,

      labelText: topicInfo.label || '',
      isTargetRoot
    });
  }
}

const mapStateToProps = ({ map }) => {
  return { selectionList: map.selectionList };
};

export default connect(mapStateToProps)(TopicEditPanel);