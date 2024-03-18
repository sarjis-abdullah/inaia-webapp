import {type AccountData} from './Account'
export interface SupportTicketMessage {
    id: number;
    message: string;
    created_by: number;
    support_ticket_id: number;
    created_at: string;
    owner: AccountData;
}
