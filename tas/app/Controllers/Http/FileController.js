'use strict';

const Helpers = use('Helpers');

class FileController {
    async upload ({ request }) {
        const validationOptions = {
            types: ['text/csv'],
            size: '2mb',
            extnames: ['xlsx','csv']
        };

        const imageFile = request.file('spreadsheet', validationOptions);


        await imageFile.move(Helpers.tmpPath('uploads'), {
            name: 'TeachingData.csv',
            overwrite: true,
        });

        if (!imageFile.moved()) {
            return imageFile.error();
        }
        return 'File uploaded';
    }
}

module.exports = FileController;