import * as React from 'react';

import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import { List } from 'office-ui-fabric-react/lib/List';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import styles from '../ReactTest/ReactTest.module.scss';
import { ReactTestSubComp } from '../../components';
import {IReactTestSubCompListProps, IReactTestSubCompListState} from './';
import { ISubCompTable } from '../../../../models';

export class ReactTestSubCompList extends React.Component<IReactTestSubCompListProps,IReactTestSubCompListState> {

     constructor(props:IReactTestSubCompListProps)
     {
          super(props);
          this.state={
               filteredSubCompTables:[],
               showAllSubCompTables:false
          };
     }

     public componentWillReceiveProps(newProps: IReactTestSubCompListProps)
     {
          let newFilteredList: ISubCompTable[]=[];
          this.state.filteredSubCompTables.forEach((filteredItem: ISubCompTable) => {
               if (newProps.subcomptables.indexOf(filteredItem) >=0 ){
                    newFilteredList.push(filteredItem);
               }
          });
          this.setState({filteredSubCompTables: newFilteredList});
     }
     public render():React.ReactElement<IReactTestSubCompListProps>{
          return (
               <div>
                    <Toggle 
                         label='Show all or filtered entries?'
                         onText='show all entries'
                         offText='show selected entries'
                         checked={this.state.showAllSubCompTables}
                         onChanged={this.onPickerToggleChanged}
                    />
                    <TagPicker className={styles.tagPicker} 
                               onResolveSuggestions={ this._onFilterChanged }
                               onChange={this._onSelectedItemsChanged}
                               pickerSuggestionsProps= {
                                        {
                                             noResultsFoundText: "No items found",
                                             suggestionsHeaderText: "Suggested items"
                                        }

                                   }
                              
                    />
                    <List 
                         items={this._subcomptablesToShow}
                         onRenderCell={this._onRenderCell}
                    />
               </div>
          );
     }
                    /*
                    {
                         this.props.subcomptables.map(s => 
                              <ReactTestSubComp   subcomptable={s} 
                                                  key={this._getUniqueKey(s)} 
                                                  onRemoveSubCompTable={this.props.onDeleteSubCompTable}
                                                  />
                         )
                    }*/

     private _onSelectedItemsChanged = (items: any[]): void => {
          const filtereditems: any[] = items.map(item => item.subcomptable);
          this.setState((prevState: IReactTestSubCompListState) => {
               const newState: IReactTestSubCompListState = {
                    showAllSubCompTables:prevState.showAllSubCompTables,
                    filteredSubCompTables:filtereditems
               };
               return newState;
          });
     }
     private get _subcomptablesToShow(): ISubCompTable[] {
          return this.state.showAllSubCompTables
               ? this.props.subcomptables
               : this.state.filteredSubCompTables;
     }
     private onPickerToggleChanged = (checked: boolean): void => {
          this.setState({ showAllSubCompTables:checked});
     }
     private _onRenderCell = (sct: ISubCompTable, index: number | undefined): JSX.Element => {
          return (
               <ReactTestSubComp key={this._getUniqueKey(sct)}
                    subcomptable={sct}
                    onRemoveSubCompTable={this.props.onDeleteSubCompTable}
               />
          );
     }
     private _onFilterChanged = (filterText: string, tagList: { key: string, name: string }[]): { key:string, name:string, subcomptable: ISubCompTable}[] => {
          const filteredSubCompTables: ISubCompTable[] = this.props.subcomptables.filter(sct => {
               if ((sct.id.toLowerCase().indexOf(filterText.toLowerCase()) === 0) || 
               (sct.name.toLowerCase().indexOf(filterText.toLowerCase())===0))
               {
                    return sct;
               }
          });
          return filteredSubCompTables.map(s => ({
               key: this._getUniqueKey(s),
               name: `(${s.id}) ${s.name}`,
               subcomptable: s
          }));
     }
     private _getUniqueKey = (subcomptable:ISubCompTable): string => {
          return (`${ subcomptable.id}`).toLowerCase();
     }
}