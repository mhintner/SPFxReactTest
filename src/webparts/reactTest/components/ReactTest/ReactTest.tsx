import * as React from 'react';
import styles from './ReactTest.module.scss';
import { IReactTestProps } from './IReactTestProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ReactTestSubComp, IReactTestSubCompProps, IReactTestState } from '../../components';
import { ISubCompTable } from '../../../../models';
import { IReactTestWebPartProps } from '../../ReactTestWebPart';
import { ReactTestSubCompList } from '../ReactTestSubCompList';

export class ReactTest extends React.Component<IReactTestProps, IReactTestState> {

  private subcomptable:ISubCompTable={
    "id":"id1",
    "name":"name1"
  };
  
  constructor(props:IReactTestWebPartProps){
    super(props);
    this.state = {
      subcomptables: []
    };
  }

  public componentDidMount(): void {
    let tables:ISubCompTable[]=[
      { "id": "item1", "name": "item1name" },
      { "id": "item2", "name": "item2name" },
      { "id": "item3", "name": "item3name" }
    ];
    this.setState({
      subcomptables:tables
    });
  }

  public render(): React.ReactElement<IReactTestProps> {
    return (
      <div className={ styles.reactTest }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              
                <ReactTestSubCompList subcomptables={this.state.subcomptables} 
                                      onDeleteSubCompTable={this._removeSubCompTable}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
  private _removeSubCompTable = (subcomptabletoremove: ISubCompTable): void => {
    const newsubcomptables: ISubCompTable[] = this.state.subcomptables.filter(sc => sc !== subcomptabletoremove);
    this.setState({ subcomptables:newsubcomptables});
  }
}
