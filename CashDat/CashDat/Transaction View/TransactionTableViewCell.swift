//
//  TransactionTableViewCell.swift
//  CashDat
//
//  Created by Daniel Wise on 2019-02-03.
//  Copyright © 2019 SnackOverflow. All rights reserved.
//

import UIKit

class TransactionTableViewCell: UITableViewCell {

    @IBOutlet weak var dateLabel: UILabel!
    @IBOutlet weak var payedLabel: UILabel!
    @IBOutlet weak var owedLabel: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
}
