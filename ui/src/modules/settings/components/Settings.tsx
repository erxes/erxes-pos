import Button from 'modules/common/components/Button';
import client from 'apolloClient';
import Col from 'react-bootstrap/Col';
import ControlLabel from 'modules/common/components/form/Label';
import FormControl from 'modules/common/components/form/Control';
import gql from 'graphql-tag';
import NameCard from 'modules/common/components/nameCard/NameCard';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Select from 'react-select-plus';
import { __ } from 'modules/common/utils';
import { Alert } from 'modules/common/utils';
import { FlexBetween, FlexCenter } from 'modules/common/styles/main';
import { FormGroup } from 'modules/common/components/form';
import { IConfig } from 'types';
import { IUser } from 'modules/auth/types';
import { MainContent, PosWrapper } from '../../orders/styles';
import { StageContent } from '../../orders/styles';
import { queries } from '../graphql';
import DailyReportReceipt from './DailyReport';

type Props = {
  syncConfig: (type: string) => void;
  posCurrentUser: IUser;
  currentConfig: IConfig;
  syncOrders: () => void;
  posUsers: IUser[];
};

type State = {
  mode: string,
  disableSendData: boolean,
  reportUserIds: string[],
  dailyReport: any,
};

export default class Settings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const mode = localStorage.getItem('erxesPosMode') || '';
    this.state = {
      mode,
      disableSendData: false,
      reportUserIds: [],
      dailyReport: undefined,
    };
  }

  onSyncConfig = () => {
    this.props.syncConfig("config");
  };

  onSyncCustomers = () => {
    this.props.syncConfig("customers");
  };

  onSyncProducts = () => {
    this.props.syncConfig("products");
  };

  onSendData = async () => {
    this.setState({ disableSendData: true });
    const { ebarimtConfig } = this.props.currentConfig;

    fetch(
      `${ebarimtConfig.ebarimtUrl}/sendData?lib=${ebarimtConfig.companyRD}`
    ).then((res: any) => (res.json())).then(res => {
      if (res.success) {
        return Alert.success(`Амжилттай.`);
      }
      return Alert.success(`Амжилтгүй: ${res.message}.`);
    }).catch(e => {
      Alert.error(`${e.message}`);
    }).then(() => {
      this.setState({ disableSendData: false });
    });
  }

  onChangeMode = (e) => {
    e.preventDefault();
    const mode = e.target.value;

    this.setState({ mode })
    localStorage.setItem('erxesPosMode', mode);
  }

  onSelectUsers = values => {
    this.setState({ reportUserIds: values.map(v => v.value) })
  };

  onReport = () => {
    client.query({
      query: gql(queries.dailyReport),
      fetchPolicy: 'network-only',
      variables: {
        posUserIds: this.state.reportUserIds
      }
    }).then(async (response) => {
      this.setState({ dailyReport: response.data.dailyReport.report })
    }).catch(error => {
      Alert.error(error.message);
    });
  }

  renderReport() {
    const { dailyReport } = this.state;

    if (!dailyReport) {
      return null;
    }

    return <DailyReportReceipt dailyReport={dailyReport} />
  }

  render() {
    const { posCurrentUser, currentConfig, posUsers } = this.props;

    return (
      <PosWrapper>
        <Row>
          <Col md={4}>
            <MainContent hasBackground={true} hasShadow={true}>
              <FlexBetween>
                <NameCard user={posCurrentUser} avatarSize={40} />
              </FlexBetween>
              <br />
              <FlexBetween>
                {currentConfig.name}
                {currentConfig.syncInfo && currentConfig.syncInfo.date}
              </FlexBetween>
              <br />
              <FormGroup>
                <ControlLabel>{__("Select Mode")}</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="chooseMode"
                  defaultValue={this.state.mode}
                  options={[
                    { value: '', label: 'Pos and full mode' },
                    { value: 'kiosk', label: 'Kiosk Mode' },
                    { value: 'kitchen', label: 'Kitchen Screen' },
                    { value: 'waiting', label: 'Waiting Screen' },
                  ]}
                  onChange={this.onChangeMode}
                  required={true} />
              </FormGroup>

              <StageContent>
                <Button
                  btnStyle="success"
                  onClick={this.onSyncConfig}
                  icon="check-circle"
                  block
                >
                  {__("ReSync Config")}
                </Button>
              </StageContent>
              <StageContent>
                <Button
                  btnStyle="success"
                  onClick={this.onSyncCustomers}
                  icon="check-circle"
                  block
                >
                  {__("ReSync Customers")}
                </Button>
              </StageContent>
              <StageContent>
                <Button
                  btnStyle="success"
                  onClick={this.onSyncProducts}
                  icon="check-circle"
                  block
                >
                  {__("ReSync Products")}
                </Button>
              </StageContent>

              <StageContent>
                <Button
                  btnStyle="warning"
                  onClick={this.props.syncOrders}
                  icon="check-circle"
                  block
                >
                  {__("Sync Orders")}
                </Button>
              </StageContent>

              <StageContent>
                <Button
                  btnStyle="warning"
                  onClick={this.onSendData}
                  icon="check-circle"
                  block
                  disabled={this.state.disableSendData}
                >
                  {__("Send-Data")}
                </Button>
              </StageContent>
            </MainContent>
          </Col>
          <Col md={8}>
            <MainContent hasBackground={true} hasShadow={true} isHalf={true}>
              <FlexBetween>
                Өдрийн тайлан
              </FlexBetween>

              <FlexCenter>
                <FormGroup>
                  <ControlLabel>{`Хэрэглэгч сонгох...`}</ControlLabel>
                  <Select
                    placeholder={__('Хэрэглэгч')}
                    value={this.state.reportUserIds}
                    clearable={true}
                    onChange={this.onSelectUsers}
                    options={(posUsers || []).map(u => ({ value: u._id, label: u.email }))}
                    multi={true}
                    block
                  />
                </FormGroup>
                <Button
                  btnStyle="warning"
                  onClick={this.onReport}
                  icon="check-circle"
                  disabled={this.state.disableSendData}
                >
                  {__("Report")}
                </Button>
              </FlexCenter>
            </MainContent>
            {this.renderReport()}
          </Col>
        </Row>
      </PosWrapper>
    );
  } // end render()
}
