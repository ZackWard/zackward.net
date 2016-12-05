import {connect} from "react-redux";
import {MessageBox} from "../components/MessageBox";
import {roguelikeState} from "../MapGenerator";

const mapStateToProps = (state: roguelikeState) => {
    return {
        messageList: state.messages.slice(-8)
    };
};

export const MessageBoxContainer = connect(mapStateToProps)(MessageBox as any);