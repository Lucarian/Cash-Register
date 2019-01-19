// -------------------------------------------------------------------------
// ( My Personal Symbols Legend: D&I === Declaration & Initialization )
// -------------------------------------------------------------------------


/**
*  --------------------- FUNCTIONALITY SUMMARY -----------------------------
* 
*  ---  It is a function which takes as arguments the price of the purchased product, the cash that the customer
*       gives to the cashier, and the cash in the drawer of the cashier. The function returns the change due and the 
*       corresponding state of the cash drawer.
*/

/**
 * cid = 'cash in drawer' is a 2D array listing available currency.
 *
 * RETURNS an Object with two keys. A 'status' key and
 * a 'change' key.
 *
 * Three (3) states exist for the returned object:
 * -- 1) {status: "INSUFFICIENT_FUNDS", change: []}
 * -- 2) {status: "CLOSED", change: [...]}
 * -- 3) {status: "OPEN", change: [...]}
 *
 * 1--> if cash-in-drawer is less than the change due, or if you cannot return the exact change.
 * 2--> with cash-in-drawer as the value for the key change if it is equal to the change due.
 * 3--> with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
 *
 */



function checkCashRegister(price, cash, cid) {

  // ------------------- AMERICAN CURRENCY UNITS -----------------------------

  // PENNY - 0.01
  // NICKEL - 0.05
  // DIME - 0.1
  // QUARTER - 0.25
  // DOLLAR - 1
  // FIVE DOLLARS - 5
  // TEN DOLLARS - 10
  // TWENTY DOLLARS - 20
  // ONE-HUNDRED DOLLARS - 100

  // -------------------------------------------------------------------------

  let currUnits = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let index = 0;  // D&I of the index used to find the maximum currency units that will be used for the change due.
  let state = { status: "", change: [] }; // D&I of the function's returned object
  let totalDrawerCash = 0; // D&I of the sum of the 'cid' argument
  let change = cash - price; // D&I of change needed to be given to the customer

  // -------------------------------------------------------------------------

  for (let v of cid) {  // for Loop to store the sum of all drawer's cash

    totalDrawerCash += v[1];
  }

  totalDrawerCash = Number(totalDrawerCash.toFixed(2));  // Conversion of total drawer's cash to an appropriate format for proper decimal precision.

  
  // 3 PARTS - 'if else' Conditional for the three different resulting states of the function.

  if (totalDrawerCash < change) {  // ------ STATE ONE (1)

    state.status = "INSUFFICIENT_FUNDS";

    return state;
  }
  else if (totalDrawerCash === change) {  // STATE TWO (2)

    state.status = "CLOSED";
    state.change = cid;

    return state;
  }
  else {    // --------------------------- STATE THREE (3)

    for (let i = 0; change < currUnits[i]; i++) {   // for Loop to store the maximum currency unit value.

      index = 1 + i;   // Here I add with one because I iterate this array [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01]
                       // starting from index[0], but I need the quantity of the array's elements counted not the index.
    }                  // This quantity will be abstracted below.

    currUnits.reverse();  // Here I reverse the array [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01] .

    for (let j = cid.length - 1 - index; j >= 0; j--) {   // for Loop that pushes the corresponding totals of the currency units in the 'state.change' property.

      if (cid[j][1] > 0 && change >= currUnits[j]) {       // if Conditional that checks if there are any money for the corresponding currency
                                                           // unit in the cash drawer and if this currency unit is smaller than or equal to the change,
                                                           // or else it cannot be used for the change.
        
        let cashTimes = Math.floor(cid[j][1] / currUnits[j]);  // store the maximum number of currency units in the cash drawer.
        let times = Math.floor(change / currUnits[j]);    // store the maximum number of currency units that can be abstracted from the remaining change.

        if (cashTimes >= times) {    // if-else Conditional to choose how many currency units to push.
          state.change.push([cid[j][0], times * currUnits[j]]);
          change -= times * currUnits[j];   // Here I abstract what I have taken out of the cash drawer.
          change = Number(change.toFixed(2));
        }
        else {
          state.change.push([cid[j][0], cashTimes * currUnits[j]]);
          change -= cashTimes * currUnits[j];   // // Here I abstract what I have taken out of the cash drawer.
          change = Number(change.toFixed(2));
        }
      }

      if (change === 0) {        // Breaks the loop to finish the process.
        state.status = "OPEN";
        break;
      }

    }

    if (change !== 0) {     // Checks if the above process resulted in proper 'change' results. -- ALSO RESULTS IN STATE (1) --
      state.status = "INSUFFICIENT_FUNDS";
      state.change = [];
    }

    return state;
  }

}

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));





