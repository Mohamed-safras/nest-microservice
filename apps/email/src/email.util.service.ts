import { Injectable } from '@nestjs/common';
import { dateTimeFormater } from '@app/common';
import caring4calLogo from './caring4cal.logo';
import { partnerDto } from './dto/partner.dto';

@Injectable()
export default class EmailUtilService {
    public static officialName:string = "Caring4Cal"

    static getCourseEmailSubject(type: string, action: string, partner: partnerDto) {
        console.log(`type:${type}, action:${action}, partner:${partner}`)
        switch (type) {
            case 'Pending':
                return `${partner.name} ${action}`
            case 'Approved':
                return `Your ${this.officialName} ${action} has been approved`
            case 'Rejected':
                return `Your ${this.officialName} Course Submission Requires Additional Information`
            default:
                return `${this.officialName} Course Upload Approval`
        }
    }

    static getCourseEmailBody(type: string, action: string, partner: partnerDto, reasons: string[], updateAt: Date, createdAt: Date) {
        console.log(`type:${type}, action:${action}, partner:${partner} reasons:${reasons}, updateAt:${updateAt}`)
        switch (type) {
            case 'Pending':
                return `
                    <p>${partner?.firstName} ${partner?.lastName} from ${partner?.name} completed ${action}. Please review before approving.</p>
                    ${updateAt ? `<p>Updated At ${dateTimeFormater(updateAt)}</p>` : ""}   
                    ${createdAt ? `<p>Created At ${dateTimeFormater(createdAt)}</p>` : ""}
                    <p>The Forest Admin Team.</p>
                    <p>Please do not reply to this message, as this email inbox is not monitored.</p>`
            case 'Approved':
                return `
                    <p>Dear ${this.officialName} Grantee,</p>
                    <p>Congratulations! Your updates have been approved and are now published on ${this.officialName}!</p>
                    ${updateAt ? `<p>Updated At ${dateTimeFormater(updateAt)}</p>` : ""}
                    ${createdAt ? `<p>Created At ${dateTimeFormater(createdAt)}</p>` : ""}   
                    <p>Team ${this.officialName}</p>
                    <img alt=${this.officialName} style="object-fit: contain;" src=${caring4calLogo.imageUrl} width="150px" height="75px"/>
                    <p>Please do not reply to this message, as this email inbox is not monitored.</p>`
            case 'Rejected':
                return `
                    <p>Dear ${this.officialName} Grantee,</p>
                    <p>Your submission requires additional information. Here are the reasons:</p>
                    <ul>
                        ${ ((reasons) => {
                            let result: string = '';
                            for (const reason of reasons) {
                                result = result + `<li>${reason}</li>`
                            }
                            return result;
                        })(reasons)}
                    </ul>
                    <p>Please review the errors on the ${this.officialName} Forest Admin platform. In the meantime, a Cell-Ed team member will be reaching out for support.</p>
                    ${updateAt ? `<p>Updated At ${dateTimeFormater(updateAt)}</p>` : ""}   
                    ${createdAt ? `<p>Created At ${dateTimeFormater(createdAt)}</p>` : ""}
                    <p>Team ${this.officialName}</p>
                    <img alt=${this.officialName} style="object-fit: contain;" src=${caring4calLogo.imageUrl} width="150px" height="75px"/>
                    <p>Please do not reply to this message, as this email inbox is not monitored.</p>`
            default:
                return `<p>Hello, Here is the ${this.officialName} course upload approval email details.</p>`
        }
    }
}