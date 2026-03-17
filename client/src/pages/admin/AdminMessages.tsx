import { useEffect, useState } from "react";
import {
  deleteAdminMessage,
  getAdminMessages,
  replyToAdminMessage,
} from "@/api/contactApi";

type Message = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  isReplied?: boolean;
  repliedAt?: string | null;
  createdAt: string;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [replySubject, setReplySubject] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getAdminMessages();
      setMessages(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this message?");
    if (!confirmed) return;

    try {
      await deleteAdminMessage(id);
      await loadMessages();
      alert("Message deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete message");
    }
  };

  const openReply = (message: Message) => {
    setReplyingTo(message);
    setReplySubject(
      message.subject
        ? `Re: ${message.subject}`
        : "Re: Your message to Xepci Rent"
    );
    setReplyMessage("");
  };

  const closeReply = () => {
    setReplyingTo(null);
    setReplySubject("");
    setReplyMessage("");
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!replyingTo) return;

    try {
      setSendingReply(true);

      await replyToAdminMessage(replyingTo.id, {
        subject: replySubject,
        message: replyMessage,
      });

      alert("Reply sent successfully");
      closeReply();
      await loadMessages();
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Messages</h1>

      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="rounded-xl border p-4 space-y-2">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold">{msg.name}</h2>

                  {msg.isReplied ? (
                    <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                      Replied
                    </span>
                  ) : (
                    <span className="rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-medium text-yellow-700">
                      New
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">{msg.email}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openReply(msg)}
                  className="rounded-md border px-3 py-1 text-sm"
                >
                  {msg.isReplied ? "Reply Again" : "Reply"}
                </button>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="rounded-md border px-3 py-1 text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>

            {msg.subject && (
              <p>
                <strong>Subject:</strong> {msg.subject}
              </p>
            )}

            {msg.phone && (
              <p>
                <strong>Phone:</strong> {msg.phone}
              </p>
            )}

            <p>{msg.message}</p>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>Received: {new Date(msg.createdAt).toLocaleString()}</p>
              {msg.isReplied && msg.repliedAt && (
                <p>Replied: {new Date(msg.repliedAt).toLocaleString()}</p>
              )}
            </div>
          </div>
        ))
      )}

      {replyingTo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Reply to Message</h2>
                <p className="text-sm text-muted-foreground">
                  To: {replyingTo.name} ({replyingTo.email})
                </p>
              </div>

              <button
                type="button"
                onClick={closeReply}
                className="rounded-md border px-3 py-1 text-sm"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSendReply} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Subject</label>
                <input
                  className="w-full rounded-lg border p-3"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Message</label>
                <textarea
                  className="min-h-[180px] w-full rounded-lg border p-3"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Write your reply..."
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeReply}
                  className="rounded-lg border px-4 py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={sendingReply}
                  className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
                >
                  {sendingReply ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}