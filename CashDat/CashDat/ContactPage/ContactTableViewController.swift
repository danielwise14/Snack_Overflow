//
//  ContactTableViewController.swift
//  CashDat
//
//  Created by Daniel Wise on 2019-02-02.
//  Copyright © 2019 SnackOverflow. All rights reserved.
//

import UIKit

class ContactTableViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {

    //MARK: IBOutlets
    
    
    @IBOutlet weak var contactTableView: UITableView!
    @IBOutlet weak var backgroundImage: UIImageView!
    
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        contactTableView.delegate = self
        contactTableView.dataSource = self
        // Do any additional setup after loading the view.
        contactTableView.register(UINib(nibName: "ContactCell", bundle: nil), forCellReuseIdentifier: "CustomContactCell")
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        //TODO: need variable declaring number of contacts with accounts. from cloud data
        return 3
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        //this function gets called for every cell in the table
        let cell = tableView.dequeueReusableCell(withIdentifier: "CustomContactCell" , for: indexPath) as! ContactCell
        
        let testNameArray = ["SnackOverflow","Dan Wise","Harsh Gupta"]
        let testBalanceArray = [35.77,111.56,-3.20]
        
        cell.cellNameLabel.text = testNameArray[indexPath.row]
        cell.cellBalanceLabel.text = String(testBalanceArray[indexPath.row])
        if testBalanceArray[indexPath.row] > 0{
            cell.cellBackground.backgroundColor = UIColor(red:0.62, green:1.00, blue:0.73, alpha:1.0)
        }
        else if testBalanceArray[indexPath.row] < 0{
            cell.cellBackground.backgroundColor = UIColor(red:1.00, green:0.62, blue:0.62, alpha:1.0)
        }
        else {
            cell.cellBackground.backgroundColor = UIColor(red:1.00, green:1.00, blue:1.00, alpha:0.0)

        }
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let cell = tableView.cellForRow(at: indexPath) as! ContactCell
        let nameToPass = cell.cellNameLabel.text
        let balanceToPass = cell.cellBalanceLabel.text
        func prepare(for segue: UIStoryboardSegue, sender: Any?){
            if segue.identifier == "contactToDetail" {
                let destinationVC = segue.destination as! ContactDetailViewController
                print(nameToPass)
                print(balanceToPass)
                destinationVC.namePassed = nameToPass!
                destinationVC.balancePassed = balanceToPass!
            }
        }
        performSegue(withIdentifier: "contactToDetail", sender: cell)
        tableView.deselectRow(at: indexPath, animated: true)
    }
        //TODO: Segue to detail page, carrying data over
}
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */


