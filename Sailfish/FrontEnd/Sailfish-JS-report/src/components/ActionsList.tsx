import { h, Component } from 'preact';
import Action from '../models/Action';
import '../styles/action.scss';
import { ActionTree } from './ActionTree';
import { StatusType } from '../models/Status';

interface ListProps {
    actions: Array<Action>;
    onSelect: (messages: Action) => void;
    onMessageSelect: (id: number) => void;
    selectedActionId: number;
    selectedMessageId: number;
    filterFields: StatusType[];
}

export class ActionsList extends Component<ListProps, {}> {

    shouldComponentUpdate(nextProps: ListProps) {
        return nextProps.actions !== this.props.actions || 
            nextProps.selectedActionId !== this.props.selectedActionId ||
            nextProps.selectedMessageId !== this.props.selectedMessageId;
    }
    
    render({ actions, selectedActionId, selectedMessageId, onSelect, filterFields, onMessageSelect }: ListProps) {
        return (
            <div class="actions-list">
            {actions.map(action => (
                <ActionTree action={action}
                    selectedActionId={selectedActionId}
                    selectedMessageId={selectedMessageId}
                    actionSelectHandler={onSelect}
                    messageSelectHandler={onMessageSelect}
                    filterFields={filterFields}/>))}
        </div>)
    }
}   