export interface InboxDocument {
    id: number;
    display_text: string;
    inbox_messages_id: number;
    document: {
        id: number;
        account_id: number;
        type_id: number;
        title: string;
        link: string;
        description: string | null;
    };
}

export interface InboxMessage {
    id: number;
    title: string;
    summary: string;
    is_read: number;
    is_draft: number;
    message_text: string;
    account_id: number;
    account?: any;
    documents?: InboxDocument[];
    created_at: string;
}
