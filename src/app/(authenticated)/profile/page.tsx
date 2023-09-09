"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input, Textarea } from "@nextui-org/input";
import { Spacer } from "@nextui-org/spacer";
import { useState } from "react";

// Sample user data (replace with actual data from your application)
const user = {
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "johndoe@example.com",
  bio: "Full-stack developer passionate about web development.",
  profilePicture: "https://i.pravatar.cc/150?u=a042581f4e29026024d", // URL to the user's profile picture
};

// Sample activity history and notifications (replace with actual data)
const activityHistory = [
  {
    id: 1,
    action: "commented on card",
    cardName: "Task 1",
    boardName: "Project Board",
    timestamp: "2 hours ago",
  },
  // Add more activity entries here
];

const notifications = [
  {
    id: 1,
    message: "You were mentioned in a comment on Project Board.",
    timestamp: "1 day ago",
    isRead: false,
  },
  // Add more notification entries here
];

const ProfilePage = () => {
  // State for editing profile information
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // Function to toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Function to handle profile information changes
  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="px-2 pt-8 container mx-auto flex flex-col gap-4 ">
      <h1 className="text-3xl">User Profile</h1>

      <Divider />

      <Avatar src={user.profilePicture} alt={user.name} />

      {isEditing ? (
        <div className="flex flex-col gap-1">
          <Input
            name="name"
            placeholder="Full Name"
            value={editedUser.name}
            onChange={handleProfileChange}
          />
          <Input
            name="username"
            placeholder="Username"
            value={editedUser.username}
            onChange={handleProfileChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={editedUser.email}
            onChange={handleProfileChange}
          />
          <Textarea
            name="bio"
            placeholder="Bio"
            value={editedUser.bio}
            onChange={handleProfileChange}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <h2>{user.name}</h2>
          <h3>@{user.username}</h3>
          <h3>{user.email}</h3>
          <p>{user.bio}</p>
        </div>
      )}

      <Spacer />

      {isEditing ? (
        <Button onClick={toggleEdit}>Save Changes</Button>
      ) : (
        <Button onClick={toggleEdit}>Edit Profile</Button>
      )}

      <Divider />

      <h1>Activity History</h1>

      {activityHistory.map((entry) => (
        <Card key={entry.id}>
          <CardBody>
            <p>{entry.action}</p>
            <p>
              {entry.cardName} in {entry.boardName}
            </p>
            <p>{entry.timestamp}</p>
          </CardBody>
        </Card>
      ))}

      <Spacer />

      <h1>Notifications</h1>

      {notifications.map((notification) => (
        <Card key={notification.id}>
          <CardBody>
            <p>{notification.message}</p>
            <p>{notification.timestamp}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default ProfilePage;
