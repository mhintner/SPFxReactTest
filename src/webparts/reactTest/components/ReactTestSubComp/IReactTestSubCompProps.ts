import {
     ISubCompTable,
     SubCompTableCallback
}
from '../../../../models';

export interface IReactTestSubCompProps {
     subcomptable: ISubCompTable;
     onRemoveSubCompTable: SubCompTableCallback;
}