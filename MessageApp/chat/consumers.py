from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message, GroupProfile
from django.contrib.auth.models import User
import channels.auth
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        self.user = await channels.auth.get_user(self.scope)
        self.group = GroupProfile.objects.get(pk=int(self.room_name))

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        #store message in database
        to_store = Message(text=message, 
            sender=self.user, group=self.group)
        to_store.save()

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'owner': self.user.pk,
                'group': self.group.pk,
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        owner = event['owner']
        group = event['group']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'owner': owner,
            'group': group,
        }))