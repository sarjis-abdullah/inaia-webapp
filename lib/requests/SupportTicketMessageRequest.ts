export interface SupportTicketMessageRequest {
    created_by: number,
    message: string,
    support_ticket_id: number
}
export interface SupportTicketMessageStoreRequest extends SupportTicketMessageRequest {}
export interface SupportTicketMessageListRequest extends SupportTicketMessageRequest {}