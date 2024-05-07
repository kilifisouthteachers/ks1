const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let database = [];

app.post('/register', (req, res) => {
    const { name, institution, cluster } = req.body;
    const membershipNumber = generateMembershipNumber();
    storeMemberDetails(membershipNumber, name, institution, cluster);
    res.status(201).json({ message: 'Member registered successfully', membershipNumber });
});

app.post('/contribute', (req, res) => {
    const { memberNumber, amount, reason } = req.body;
    contribute(memberNumber, amount, reason);
    res.status(200).json({ message: 'Contribution recorded successfully' });
});

app.get('/report', (req, res) => {
    const { format } = req.query;
    const report = generateReport(format);
    res.status(200).send(report);
});

function generateMembershipNumber() {
    let prefix = "KSTW0001-24";
    let uniqueNumber = Math.floor(Math.random() * 10000) + 1;
    return prefix + uniqueNumber.toString().padStart(4, '0');
}

function storeMemberDetails(membershipNumber, name, institution, cluster) {
    database.push({
        membershipNumber: membershipNumber,
        name: name,
        institution: institution,
        cluster: cluster,
        amountContributed: 0, 
        paymentRecords: [] 
    });
}

function contribute(memberNumber, amount, reason) {
}

function generateReport(format) {
    return `Report in ${format} format`;
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});