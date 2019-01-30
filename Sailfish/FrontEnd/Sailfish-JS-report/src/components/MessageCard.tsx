import {h, Component} from 'preact';
import '../styles/messages.scss';
import Message from '../models/Message';
import { StatusType, statusValues } from '../models/Status';
import Action from '../models/Action';
import { MessageRaw } from './MessageRaw';
import { copyTextToClipboard } from '../helpers/copyHandler';
import { showNotification } from '../helpers/showNotification';
import { getHashCode } from '../helpers/stringHash';

const HUE_SEGMENTS_COUNT = 36;

interface MessageCardProps {
    message: Message;
    isSelected?: boolean;
    actionsMap: Map<number, Action>;
    status?: StatusType;
}

interface MessageCardState {
    showRaw: boolean;
}

export default class MessageCard extends Component<MessageCardProps, MessageCardState> {
    
    constructor(props: MessageCardProps) {
        super(props);
        this.state = {
            showRaw: false
        };
    }

    shouldComponentUpdate(nextProps: MessageCardProps, nextState: MessageCardState) {
        if (nextState !== this.state) return true;

        if (nextProps.message !== this.props.message || nextProps.status !== this.props.status) {
            return true;
        } 

        return nextProps.isSelected !== this.props.isSelected;
    }

    showRaw() {
        this.setState({
            ...this.state,
            showRaw: !this.state.showRaw
        });
    }
    
    render({message, isSelected, actionsMap, status}: MessageCardProps, {showRaw}: MessageCardState) {
        const { msgName, timestamp, from, to, contentHumanReadable, raw } = message,
            rootClass = ["message-card", (status || "").toLowerCase(), (isSelected ? "selected" : "")].join(" "),
            contentClass = ["message-card-content", (status || "").toLowerCase()].join(" "),
            showRawClass = ["message-card-content-controls-showraw-icon", (showRaw ? "expanded" : "hidden")].join(" ");

        const actions = [...actionsMap.values()];

        const hueValue = this.calculateHueValue(from, to);

        return(
            <div class={rootClass}>
                <div class="message-card-header">
                    <div class="message-card-header-action">
                        {statusValues.map(statusValue => {
                            //getting status chip element for each status
                            const statusCount = actions.filter(action => action.status.status === statusValue).length,
                                className = ["message-card-header-action-chip", statusValue.toLowerCase()].join(' ');

                            return statusCount ? (<div class={className}><p>{statusCount}</p></div>) : null;
                        })}
                    </div>
                    <div class="message-card-header-timestamp-value">
                        <p>{timestamp}</p>
                    </div>
                    <div class="message-card-header-name-value">
                        <p>{msgName}</p>
                    </div>
                    <div class="message-card-header-from-value">
                        <p>{from}</p>
                    </div>
                    <div className="message-card-header-to-value">
                        <p>{to}</p>
                    </div>
                    <div class="message-card-header-name">
                        <span>Name</span>
                    </div>
                    <div class="message-card-header-session">
                        <span>Session</span>
                    </div>
                    {
                        from && to ? 
                        <div class="message-card-header-session-icon" 
                            style={{filter: `invert(1) sepia(1) saturate(5) hue-rotate(${hueValue}deg)`}}/>
                        : null
                    }
                    {/* DISABLED */}
                    <div class="message-card-header-prediction"
                        title="Not implemeted">
                        <div class="message-card-header-prediction-icon"
                            onClick={() => alert("Not implemented...")}/>
                    </div>
                </div>
                <div class={contentClass}>
                    <div class="message-card-content-human">
                        <p>{contentHumanReadable}</p>
                    </div>
                    <div class="message-card-content-controls">
                        {
                            (raw && raw !== "null") ? 
                            <div class="message-card-content-controls-showraw"
                                onClick={e => this.showRaw()}>
                                <div class="message-card-content-controls-showraw-title">
                                    <span>{showRaw ? "Close raw" : "Show raw"}</span>
                                </div>
                                <div class={showRawClass}/>
                            </div>
                            : null
                        }
                        {
                            showRaw ? 
                            (<div class="message-card-content-controls-copy-all"
                                onClick={() => this.copyToClipboard(raw)}
                                title="Copy all raw content to clipboard">
                                <div class="message-card-content-controls-copy-all-icon"/>
                                <div class="message-card-content-controls-copy-all-title">
                                    <span>Copy All</span>
                                </div>
                            </div>)
                            : null
                        }
                    </div>
                    {
                        showRaw ?
                        <MessageRaw 
                            rawContent={raw}
                            copyHandler={this.copyToClipboard}/>
                        : null
                    }
                </div>
            </div>
        );
    }

    private copyToClipboard(text: string) {
        copyTextToClipboard(text);
        showNotification('Text copied to the clipboard!');
    }

    private calculateHueValue(from: string, to: string): number {
        return (getHashCode([from, to].filter(str => str).sort((a, b) => a.localeCompare(b)).join(''))
            % HUE_SEGMENTS_COUNT) * (360 / HUE_SEGMENTS_COUNT);
    }
}