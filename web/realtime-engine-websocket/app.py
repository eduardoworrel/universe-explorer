from aiohttp import web
import urllib.request
import json
import socketio

sio = socketio.AsyncServer(async_mode='aiohttp',cors_allowed_origins='*')
app = web.Application()
sio.attach(app)


allObjects = []
pairObjUid = []

@sio.event
async def anyChange(uid,parsed):
   
    notFound = True
    for obj in allObjects:
       
        if(obj[0] == parsed[0]):
            allObjects.remove(obj)
            allObjects.append(parsed)
            notFound = False
           

    if(notFound):
        allObjects.append([
            parsed[0],
            parsed[1],
            parsed[2],
            parsed[3],
            parsed[4],
            uid
            ])
        pairObjUid.append([parsed[0],uid])
    
    await sio.emit('anyChange', allObjects)


@sio.event
async def chatMessage(uid,message):
   await sio.emit('chatMessage', message)


@sio.event
async def disconnect(sid):
    print('disconnect ', sid)  
    for obj in pairObjUid:
        if(obj[1] == sid):
            for item in allObjects:
                if item[0] == obj[0]:
                    allObjects.remove(item)
                    pairObjUid.remove(obj)
                    await sio.emit('logout', item[0])
                    break
    

if __name__ == '__main__':
    web.run_app(app)