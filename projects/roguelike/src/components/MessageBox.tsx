import * as React from "react";

interface MessageBoxProps {
    messageList: string[];
}

export const MessageBox = (props: MessageBoxProps) => {
    let messageId: number = 0;
    let messages: any = props.messageList.map(message => {
        return (<li key={messageId++}>{message}</li>);
    });
    messages.reverse();

    return (
        <div>
            <ul id="messages">
                {messages}
            </ul>
        </div>
    );
};