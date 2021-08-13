import * as React from 'react';
import { ISubCompTable } from '../../../../models';
import styles from '../ReactTest/ReactTest.module.scss';
import {IReactTestSubCompProps} from './';

export class ReactTestSubComp extends React.Component<IReactTestSubCompProps,{}> {

     public render():React.ReactElement<IReactTestSubCompProps>{
          return (
               <div>
                    <table>
                         <tbody>
                              <tr>
                                   <td>{this.props.subcomptable.id}</td>
                                   <td>{this.props.subcomptable.name}</td>
                              </tr>
                         </tbody>
                    </table>
                    <a href='#' className={styles.button} onClick={this._handleOnRemoveClick}>
                         <span className={styles.label}>Remove Entry</span>
                    </a>
               </div>
          );
     }
     private _handleOnRemoveClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
          event.preventDefault();
          this.props.onRemoveSubCompTable(this.props.subcomptable);
     }
}
