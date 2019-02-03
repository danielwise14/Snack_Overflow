//
//  TransactionTableViewController.swift
//  CashDat
//
//  Created by Daniel Wise on 2019-02-03.
//  Copyright © 2019 SnackOverflow. All rights reserved.
//

import UIKit

class TransactionTableViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    @IBOutlet weak var transactionTableView: UITableView!
    @IBOutlet weak var backgroundImage: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        navigationController?.isNavigationBarHidden = false
        
        transactionTableView.delegate = self
        transactionTableView.dataSource = self
        // Do any additional setup after loading the view.
        transactionTableView.register(UINib(nibName: "TransactionTableViewCell", bundle: nil), forCellReuseIdentifier: "TransactionCell")
        // Do any additional setup after loading the view.
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        //TODO: need variable declaring number of contacts with accounts. from cloud data
        return 3
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TransactionCell" , for: indexPath) as! TransactionTableViewCell
        
        let testDateArray = ["Jan 17","Jan 21","Feb 1"]
        let testIPayArray = [35.77,111.56,6.43]
        let testIOweArray = [3.41,55.1,0.98]
        
        cell.dateLabel.text = testDateArray[indexPath.row]
        cell.owedLabel.text = String(testIOweArray[indexPath.row])
        cell.payedLabel.text = String(testIPayArray[indexPath.row])
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

    }
}
