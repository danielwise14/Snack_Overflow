//
//  ImageEditorViewController.swift
//  CashDat
//
//  Created by Daniel Wise on 2019-02-03.
//  Copyright © 2019 SnackOverflow. All rights reserved.
//

import UIKit
import Firebase

class ImageEditorViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var xSlider: UISlider!
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
        navigationController?.isNavigationBarHidden = false
        
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
            imageView.image = selectedImage
        }
        imagePicker.dismiss(animated: true, completion: nil)
    }
   
    
    @IBAction func setButtonPressed(_ sender: Any) {
        let data = Data()
        let storage = Storage.storage()
        let storageRef = storage.reference()
        let receiptRef = storageRef.child("images/IMG_0007.JPG")
        let uploadTask = receiptRef.putData(data, metadata: nil) { (metadata, error) in
            guard let metadata = metadata else {
                // Uh-oh, an error occurred!
                return
            }
        //this chunk doesn't quite work, but should upload the photo with the coordinates as sliders

        
    }
    
}
}
