
const sqlUpdateUnitShare = (unitYearCode, newShare, enrolled , minLoad) => {
    AssignedLoad = Math.max(Math.log10(enrolled/7),minLoad)*newShare;
    return("UPDATE UnitYear SET share = '"+newShare+"', AssignedLoad = '"+AssignedLoad+"' WHERE UnitYearCode = '"+unitYearCode+"'");
}

module.exports = sqlUpdateUnitShare; 