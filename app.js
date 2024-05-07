
let database = [];

function registerMember(name, institution, cluster) {
    let membershipNumber = generateMembershipNumber();

    notifyMember(name, membershipNumber);

    promptSafaricomLine();

    storeMemberDetails(membershipNumber, name, institution, cluster);

    return membershipNumber; 
}

function generateMembershipNumber() {
    let prefix = "KSTW0001-24";
    let uniqueNumber = Math.floor(Math.random() * 10000) + 1;
    return prefix + uniqueNumber.toString().padStart(4, '0');
}

function notifyMember(name, membershipNumber) {
    console.log(`Dear ${name}, your registration was successful. Your membership number is: ${membershipNumber}`);
}

function promptSafaricomLine() {
    console.log("Please use your Safaricom line (0727284993) for making contributions.");
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
    
    let member = database.find(member => member.membershipNumber === memberNumber);
    if (member) {

        member.amountContributed += amount;

        member.paymentRecords.push({
            amount: amount,
            reason: reason
        });

        console.log(`Contribution of KES ${amount} received from member ${memberNumber}.`);
    } else {
        console.log("Member not found.");
    }
}

function generateReport(format) {
    let report = '';

    switch (format) {
        case 'xl':
            report = 'Excel report generated.';
            break;
        case 'docs':
            report = 'Word document report generated.';
            break;
        case 'csv':
            report = 'CSV report generated.';
            break;
        case 'pdf':
            report = 'PDF report generated.';
            break;
        default:
            report = 'Invalid report format.';
    }

    return report;
}

function login(username, password) {
    if (username === 'admin' && password === 'password') {
        console.log('Login successful.');
        return true;
    } else {
        console.log('Invalid credentials. Please try again.');
        return false;
    }
}

function logout() {
    console.log('Logged out successfully.');
}

let memberNumber = registerMember("John Doe", "University X", "Cluster Y");

contribute(memberNumber, 1000, "Membership Fee");

let report = generateReport('pdf');
console.log(report);

login('admin', 'password');
logout();