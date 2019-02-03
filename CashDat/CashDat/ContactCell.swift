//
//  ContactCell.swift
//  CashDat
//
//  Created by Daniel Wise on 2019-02-02.
//  Copyright © 2019 SnackOverflow. All rights reserved.
//

import UIKit

class ContactCell: UITableViewCell {

    
    @IBOutlet weak var cellBackground: UIView!
    @IBOutlet weak var cellBalanceLabel: UILabel!
    @IBOutlet weak var cellNameLabel: UILabel!
    
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
