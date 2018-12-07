import {h} from 'preact';
import Status from '../models/Status';

interface StatusPaneProps {
    status: Status;
}

export const StatusPane = ({status}: StatusPaneProps) => {
    return (
        <div>STATUS</div>
    );
}