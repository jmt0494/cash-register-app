function checkCashRegister(price, cash, cid1) {
  let cid = cid1.map(x => [...x])
  let counter = 0
  let temp = []
  let result = {status: "", change: []};
  const denom = [
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.10],
    ['QUARTER', 0.25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]]
  let changeDue = cash - price

   for (let i = 8; i >= 0; i--) {
    if (denom[i][1] <= changeDue) {
     while (cid[i][1] !== 0 && denom[i][1] <= changeDue) {
       if (!temp.includes(cid[i][0])){
         temp.push(denom[i][0],denom[i][1]);
        } else {
          temp.splice(1, 1, Math.round(temp[1] * 100) / 100 + Math.round(denom[i][1] * 100) / 100);
        }
      cid[i].splice(1, 1, Math.round(cid[i][1] * 100) / 100 - Math.round(denom[i][1] * 100) / 100);
      changeDue = Math.round(changeDue * 100) / 100 - Math.round(denom[i][1] * 100) / 100;
    }
    result.change.push(temp);
    temp = [];
    } 
  }
  if (changeDue !== 0) {
    result.status = "INSUFFICIENT_FUNDS"
    result.change = []
  } else {
    for (let i = 0; i < cid.length; i++) {
      if (cid[i][1] !== 0) {
        counter ++
      }
    }
    if (counter === 0) {
      result.status = 'CLOSED';
      result.change = cid1
    } else{
      result.status = 'OPEN'
    }
  }
  return result;
}

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])