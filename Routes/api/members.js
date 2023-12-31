const express = require('express');
const members = require('../../Members');
const router = express.Router();
const uuid = require('uuid');

// Gets all members 
router.get('/', (req, res) => {
    res.json(members)
});

//Get a single member
// Also checking if there is a member that is not with that particular id 
router.get('/:id', (req, res) => {
    const found = members.some((member) => member.id === parseInt(req.params.id))

    if(found) {
        res.json(members.filter((member) => member.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({message: `No member with the id of ${req.params.id}`})
    }
})

// Create Members - uses Post request
router.post('/', (req, res) => {
    newMember = {
        id: uuid.v4(),
        name: req.body.name, 
        email: req.body.email,
        status: "active"
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({ msg: "please include name and email "})
    } 

    members.push(newMember);
    res.json(members)
});

// UPDATE MEMBER - PUT REQUEST
router.put('/:id', (req, res) => {
    const found = members.some((member) => member.id === parseInt(req.params.id))

    if(found) {
        const updateMember = req.body;
        members.forEach((member) => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.json({ msg: `member was updated`, member})
            }
        })
    }else{
        res.status(400).json({message: `No member with the id of ${req.params.id}`})
    }
})

// DELETE MEMBER -DELETE 
router.delete('/:id', (req, res) => {
    const found = members.some((member) => member.id === parseInt(req.params.id))

    if(found) {
        res.json({ 
            msg: 'member deleted', 
            members : members.filter((member) => member.id !== parseInt(req.params.id))
        })
    }else{
        res.status(400).json({message: `No member with the id of ${req.params.id}`})
    }
})

module.exports = router;