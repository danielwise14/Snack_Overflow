//
//  ImageEditorViewController.swift
//  CashDat
//
//  Created by Daniel Wise on 2019-02-03.
//  Copyright © 2019 SnackOverflow. All rights reserved.
//

import UIKit

class ImageEditorViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var xSlider: UISlider!
    @IBOutlet weak var xSlider2: UISlider!
    @IBOutlet weak var ySlider: UISlider!{
        didSet{
            ySlider.transform = CGAffineTransform(rotationAngle: CGFloat(-Double.pi/2))
        }
    }
    @IBOutlet weak var ySlider2: UISlider!{
        didSet{
            ySlider2.transform = CGAffineTransform(rotationAngle: CGFloat(-Double.pi/2))
        }
    }
    
    
    let imagePicker = UIImagePickerController()
    var chosenImage: UIImage? = nil
    
    override func viewDidLoad() {
        super.viewDidLoad()
        imagePicker.delegate = self
        if UIImagePickerController.isSourceTypeAvailable(UIImagePickerController.SourceType.camera){
            imagePicker.sourceType = UIImagePickerController.SourceType.camera
        }
        imagePicker.allowsEditing = false
        present(imagePicker, animated: true, completion: nil)
        // Do any additional setup after loading the view.
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        if let selectedImage = info[UIImagePickerController.InfoKey.originalImage] as? UIImage {
            self.chosenImage = selectedImage
        }
        imagePicker.dismiss(animated: true, completion: nil)
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
