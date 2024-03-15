import {type AccountData} from './Account'
import {type SupportTicketMessage} from './SupportTicketMessage'
import {type SupportTicketStatus} from './SupportTicketStatus'

export interface SupportTicket {
    id: number;
    subject: string;
    rating: number | null;
    account_id: number;
    support_status_id: number;
    created_at: string;
    updated_at: string;
    updated_by: number | null;
    updater: any;
    account: AccountData;
    support_status: SupportTicketStatus;
    messages: SupportTicketMessage[];
}
