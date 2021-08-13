import { ISubCompTable,
          SubCompTableCallback
} from '../../../../models';

export interface IReactTestSubCompListProps {
     subcomptables:ISubCompTable[];
     onDeleteSubCompTable:SubCompTableCallback;
}