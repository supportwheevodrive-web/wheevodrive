import { MessageSquare, ChevronRight } from "lucide-react";
import "./NoChatSelected.css";
const NoChatSelected = () => {
  return (
    <div className="no-chat-container">
      <div className="no-chat-content">
        <div className="icon-wrapper">
          <div className="icon-circle">
            <MessageSquare className="chat-icon" />
          </div>
          <div className="dotted-circle"></div>
        </div>

        <div className="text-content">
          <h2 className="title">
            Welcome to <span className="logo-text">WheevoDrive</span>
          </h2>
          <p className="subtitle">
            Select a conversation or start a new one to begin messaging
          </p>
        </div>

        <div className="tips-section">
          <div className="tip-item">
            <ChevronRight className="tip-icon" />
            <span>Click on a contact to start chatting</span>
          </div>

          <div className="tip-item">
            <ChevronRight className="tip-icon" />
            <span>Your messages are end-to-end encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
