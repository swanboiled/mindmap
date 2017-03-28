import * as React from 'react';
import { connect } from 'dva'
import * as WidgetGenerator from './widgetgenerator';
import { events, componentMapManager } from 'src/managers';
import * as CommonConstant from 'src/constants/Common';
import { appState, sheetState } from 'src/interface'

const UpdateSheetBgColorPicker = WidgetGenerator.colorPickerGenerator('background color', 'sheet/updateSheetBackgroundColor');
const UpdateLabelModeCheckBox = WidgetGenerator.checkBoxGenerator('show label', 'onUpdateSheetInfoItemMode');

interface SheetEditPanelProps {
  app: appState
  sheet: sheetState
  dispatch: Function
}

class SheetEditPanel extends React.Component<SheetEditPanelProps, any> {
  constructor(props: SheetEditPanelProps) {
    super(props);

    this.state = {
      show: true,
      backgroundColor: props.sheet.backgroundColor,
      isLabelCard: props.app.infoItemDisplay.label === CommonConstant.INFO_ITEM_CARD_MODE
    }
  }

  /**
   * @description color picker props for updating store and state
   * */
  generateColorPickerProps(stateKey) {
    return {
      value: this.state[stateKey],
      onChange: (id, color) => {
        this.props.dispatch({ type: id, [stateKey]: color });
        this.setState({ [stateKey]: color });
      }
    }
  }

  generateInfoItemModeCheckBoxProps(stateKey: string, infoItem: string) {
    return {
      checked: this.state[stateKey],
      onClick: (e) => {
        const widgetId = e.target.id;
        const checked = e.target.checked;

        const mode = checked ? CommonConstant.INFO_ITEM_CARD_MODE : CommonConstant.INFO_ITEM_ICON_MODE;

        componentMapManager.sheetComponent[widgetId](infoItem, mode);

        this.setState({
          [stateKey]: checked
        });
      },
      onChange: () => {}
    }
  }

  render() {
    const panelProps = {
      className: 'edit-panel sheet-edit-panel',
      style: {
        display: this.state.show ? 'block' : 'none'
      }
    };
    
    return (
      <div {...panelProps}>
        <UpdateSheetBgColorPicker {...this.generateColorPickerProps('backgroundColor')}/>
        <UpdateLabelModeCheckBox {...this.generateInfoItemModeCheckBoxProps('isLabelCard', 'label')}/>
      </div>
    );
  }
}

const mapStateToProps = ({ sheet, app }) => {
  return { sheet, app }
};

export default connect(mapStateToProps)(SheetEditPanel);