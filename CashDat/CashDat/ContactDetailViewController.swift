//
//  ContactDetailViewController.swift
//  
//
//  Created by Daniel Wise on 2019-02-02.
//

import UIKit

class ContactDetailViewController: UIViewController {

    var namePassed = ""
    var balancePassed = ""
    
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var emailLabel: UILabel!
    @IBOutlet weak var balanceImage: UIImageView!
    @IBOutlet weak var balanceLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        nameLabel.text = namePassed
        balanceLabel.text = balancePassed
        // Do any additional setup after loading the view.
    }
    
    @IBAction func requestMoneyAction(_ sender: Any) {
        //TODO: Request Money, send back to list on success
    }
    
    @IBAction func eraseDebtAction(_ sender: Any) {
        //TODO: Remove data from firebase, send back to list on success
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
