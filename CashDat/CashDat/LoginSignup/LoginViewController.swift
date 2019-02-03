//
//  LoginViewController.swift
//  CashDat
//
//  Created by Daniel Wise on 2019-02-02.
//  Copyright © 2019 SnackOverflow. All rights reserved.
//

import UIKit
import Firebase

class LoginViewController: UIViewController {

    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var passTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    navigationController?.isNavigationBarHidden = false
        // Do any additional setup after loading the view.
    }

    @IBAction func loginAction(_ sender: Any) {
    
        Auth.auth().signIn(withEmail: emailTextField.text!, password: passTextField.text!) { (user, error) in
            if error == nil{
                self.performSegue(withIdentifier: "loginToHome", sender: self)
            }
            else{
                let alertController = UIAlertController(title: "Error", message: error?.localizedDescription, preferredStyle: .alert)
                let defaultAction = UIAlertAction(title: "OK", style: .cancel, handler: nil)
                
                alertController.addAction(defaultAction)
                self.present(alertController, animated: true, completion: nil)
            }
        }
        
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
