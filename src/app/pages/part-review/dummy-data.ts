// dummy (aka test) data is used for test cases
import { ArsUser, Part } from '@models/ars-app.models';

export const TableData: Array<Part> =  [
    {
        partId: 1,
        partNo: '1F12406-507',
        partName: 'Tavis Delta-P Transducer',
        drawingNo: 'S0M3NUM83R',
        serialNo: '38686',
        lotNo: null,
        supplierCode: 'S0M3NUM83R',
        supplierName: 'Tavis',
        vehicleProgram: 'Atlas',
        vehicleSystem: 'System',
        missionName: 'AFSPC-11',
        tailNo: 'AV079',
        partReviewStatus: null,
        partReviewDate: null ,
        partSource: 'Supply Closet',
        createdOn: new Date('01/20/2018'),
        createdBy: 'AUSERIDNUMBER', // this should be an actual user one the front end
        lastUpdatedOn: null,
        lastUpdatedBy: null,
    },
];
