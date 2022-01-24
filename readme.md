# Udemy Course - Microservices with Node JS and React

- [Course](https://www.udemy.com/course/microservices-with-node-js-and-react/)
- [Repository - Drawings](https://github.com/StephenGrider/microservices-casts)

## Section 1: Fundamental Ideas Around Microservices

### Lecture 4. What is a Microservice?

A monolith contains:

- Routing
- Middleware
- Business Logic (Feature)
- DB Access
  to implement all features in an app

A microservice contains all the above to implement one feature of an app

### Lecture 5. Data in Microservices

Microservice Problem #1 Data Mngmnt between services (store and comm date between services)

- each service gets its own database
- service will never access the others DB
  DB per Service to:
- each srvice run independent
- db schema/struct to be able to change
- db optimized per srvice

### Lecture 7. Sync Communication Between Services

Sync: services communicate with direct requests
Async: services communicate using events
Sync pros: easy to grasp, a service dontneed its own storage
Sync cons: dependencies, slow performance, nesting

### Lecture 8. Event-Based Communication

For Async comm we use the Event Bus: services emit or receive events from the bus
Event Bus is a single point of failure, it acts as a hub between services. it has the cons of sync comm

### Lecture 9. A Crazy Way of Storing Data

Like DB per service, async comm seems bizarre and inefficient

- first we define inputs-outputs to a new service (e.g given user ID show title/iage of every product ordered)
- then create a DB with only the fields in speced IOs (e.g User{id, prod ids} Products{id,title,image})
  Problem: How we populate/sync the new DB from existing service DBs? A service is not aware when other services pdate their DBs
  We need to solve this without create dependencies, no cascade fails (Event Bus saves the day)
- when a service updates its DB emits an event to the EventBus (with event type and update data)
- interested services listen to events on bus and update their DBs as well

### Lecture 10. Pros and Cons of Async Communication

Pros:
_ zero dependencies
_ services are extremely fast
Cons:
_ data duplication (extra DB, storage)
_ difficult to understand

## Section 2: A Mini-Microservices App

### Lecture 11. App Overview

simple project not a template: a post creating app with comments (post w/ comments in diplay)
one service per resource in app (posts, comments)
Posts service: Create a Post / List all Posts
Comments service: Create a Comment / List all Comments
Comments are tied to Posts (dependency) so we will need an EventBus to Sync (maybe another service as well)

### Lecture 12. Project Setup

One React Frontend App + 2 Services (Router + Posts/Comments Feature)
Steps:
_ Generate a new React App using Create-React-App
_ Create an Express based project for the Posts Service
* Create an Express based project for the Comments Service
We create our react app with `npx create-react-app client`
We create a folder for posts service `mkdir posts` and init start a node project `npm init -y` and we install in posts the necessary packages `npm install express cors axios nodemon`
we repeat the same process like posts for a *comments\* folder
To run the project we need 3 terminal windows

### Lecture 13. Posts Service Creation

2 actions (routes) as express app
_ POST /posts {title: string} => Create new post
_ GET /posts => Retrieve all posts
we ll store data in memory (nn persistent) and write a boilerplate file

```
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req,res) => {
    res.send(posts);
});

app.post('/posts', (req,res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    res.status(201).send(posts[id]);
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});
```

we add a start script in package.json and run it with `npm start`

### Lecture 14. Testing the Posts Service

we use postman to test our api. use application/json as content-type and write body as raw and JSON

### Lecture 15. Implementing a Comments Service

- repeat same for comments.. we get array if undefined create empty array
- `:id` in path can be extracted as param

### Lecture 21. Handling CORS Errors

we need to configure the servr. install cors `npm install cors` to both backend express apps
start services and in index.js import it and use it as middleware `app.use(cors());`

### Lecture 22. Fetching and Rendering Posts

we use react lifecycle method to run code at one time (render)

```
 useEffect(() => {
    fetchPosts();
  }, []);
```

get data as array from object `Object.values`

### Lecture 23. Creating Comments

do the same as Posts creating React comps for Comments but we need id of the post for the
POST method. this is done with props. we add state using React Hook and event handlers

### Lecture 24. Displaying Comments

like Posts boiler plate React. performance wise we have issue we make a comment ajax request for each post in list even if it has no comments

### Lecture 26. Request Minimization Strategies

we want to improve perf and make one request to get all. in monolith app its easy
to avoid monolith we have sync and async approach. with sync services communicate bundle the data and reply

### Lecture 27. An Async Solution

we use an event broker. an event router between services. events are emitted when data is created so everyone interested can listen and update their lists
a query service builds the response to a complex query

### Lecture 29. Event Bus Overview

event bus can be RabbitMQ, Kafka etc (pubsub). as implistic event bus on expressJS serves to understand conept
expressJS event bus will listen to POST /events. all microservices (posts, comments and query) will also listen to POST /events on their respective port
do not leave unahndled Promise Rejections as they crash the app (node v15+)

### Lecture 31. A Basic Event Bus Implementation

add a new folder for service `/event-bus` install express nodemon axios

### Lecture 35. Creating the Data Query Service

Query service does not need axios only cors nodemon express

## Section 3: Running Services with Docker

### Lecture 53. Deployment Issues

one way to deploy services is on a vm. does not scale easily and do load balance. to scale we need new ports (alter program?)

### Lecture 54. Why Docker?

with Docker each service will run in a container. run multiple containers odf same service to scale
docker wraps running env and starup scripts

### Lecture 55. Why Kubernetes?

kubernetes is a tool to run containers. a cluster running VMs (nodes) + a master node
we use config files load them to master node and he knws how to configure the system putting containers in nodes

### Lecture 58. Dockerizing the Posts Service

to dockerize an app we need to create an image using a Dockerfile using commands
`FROM node:alpine` specify base image
`WORKDIR /app` set the working directory to /app in the container. all following commands will be issued relative to this direct
`COPY package.json ./` copy over only the package.json file
`RUN npm install` install all dependencies
`COPY ./ ./` copy over all of our remaining source code
`CMD ["npm","start"]` set the command to run when the command starts up
we also add an `.dockerignore` file with files to ignore from image building `node_modules`
we run `docker build .` to build the posts service image in the posts folder
we get image id to run it with `docker run <id>`

### Lecture 59. Review Some Basic Commands

basic docker commands
`docker build -t achliopa/posts` build an image using the Dockerfile in current dir and tag it
`docker run <image id or imagetag>` run container based on id or tag
`docker run -it <image id or imagetag> <cmd>` run container based on id or tag overwrite default cmd
`docker ps` see all running containers
`docker exec -it <container id> <cmd>` exec a comand on running container
`docker logs <container id>` printout logs from running container

## Section 4: Orchestrating Collections of Services with Kubernetes

### Lecture 61. Installing Kubernetes

if using docker app (win, mac) open app and select enable kubernetes. in linux we need to install minikube
for linux go to [minikube](https://minikube.sigs.k8s.io/docs/start/)
start minikube with `minikube start`

### Lecture 63. A Kubernetes Tour

check k8s version with `minikube kubectl version`. in k8s master node we use a config file to orchestrate deployment of our services in k8s cluster.
it gets images from local or remote repo. containers are running in slave nodes in pods. a deplyment service running in master manages pods
k8s service gicves access to running pods of same container in the cluster it offers abstraction to the rest of the app
**Kubernetes Cluster** a collection of nodes + a master to manage them
**Node** a VM that runs our containers
**Pod** much like a running container (a pod can run multiple containers though)
**Deployment** monitors a set of pods, make sure they are running and restarts them if they crash
**Service** provides an easy to remember URL to access a running container

### Lecture 65. Notes on Config Files

K8s Config Files

- tells k8s about the different deployments, pods and services(objects) we want to create
- written in YAML
- always store these files with project source code
- dont create objects without config files (run direct commands only for testing or learning)

### Lecture 66. Creating a Pod

into posts directory. we rebuild the image to tag it `docker build -t achliopa/posts:0.0.1 .` out of current dir
push image to dockerhub

```
docker login

```

we create a new dir called /infra/k8s in the project and add posts.yaml

```
apiVersion: v1  ### k8s is extensible we can add in our own objects. this specs the set of obejects we want k8s to look at
kind: Pod ### type of object we want to create
metadata: ### config options for the object to create
  name: posts ### name of object when created
spec: ### the exact attribute to apply to object we will create
  containers: ### we can create many containers in a pod
    - name: posts ### name of container
      image: achliopa/posts:0.0.1 ### image to use for container
```

the above file tells k8s to create a pod with a container of our image
we run the file `minikube kubectl apply -f posts.yaml`
If your pods are showing ErrImagePull, ErrImageNeverPull, or ImagePullBackOff errors after running kubectl apply, the simplest solution is to provide an imagePullPolicy to the pod.
First, run `kubectl delete -f infra/k8s/`

Then, update your pod manifest:

```
spec:
  containers:
    - name: posts
      image: cygnet/posts:0.0.1
      imagePullPolicy: Never
```

Then, run `kubectl apply -f infra/k8s/`
[tutorial](https://minikube.sigs.k8s.io/docs/commands/docker-env/)

### Lecture 69. Common Kubectl Commands

`kubectl get pods` equivalent to `docker ps`
`kubectl exec -it [pod_name] [cmd]` equivalent `docker exec -it [container]`
`kubectl logs [pod_name]` equivalent to `docker logs [container_id]`
`kubectl delete pod [pod_name]` delete given pod
`kubectl apply -f [config file name]` process config
`kubectl describe pod [pod_name]` printout info for running pod

to replace kubectl with k edit `~/.bahrc` file and add `alias k=kubectl`

### Lecture 71. Introducing Deployments

a deployment manages a set of pods (same pods). if a pod stops a new one is deployed.
also it deploys new versions automatically (new pods and stop old pods)
we create a new config file for deployment posts-depl.yaml

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: posts-depl
spec:
  replicas: 1 ## num of pods
  selector:
    matchLabels:
      app: posts #no meaning just a tag
  template:
    metadata:
      labels:
        app: posts
    spec:
      containers:
        - name: posts
          image: achliopa/posts:0.0.1
```

### Lecture 73. Common Commands Around Deployments

Deployment commands
`kubectl get deployments` lists all the running deployments
`kubectl describe deployment [depl name]` print details for a depl
`kubectl delete deployment [dep name]` delete deployment

### Lecture 74. Updating Deployments

Update image used in a depl (method 1)

- make a change to the code
- rebuild image using a new version num
- in config file update image version
- redeploy
  Update image used in a depl (method 2)
- use latest tag in depl config file for pod spec
- make a change to the code
- rebuild image
- push image in docker hub
- run command `kubectl rollout restart deployment [depl_name]`

### Lecture 76. Networking With Services

services provide networking between pods. we use the servie to access the pod from outside
we have 4 types of services
Cluster IP: sets up an easy to remember URL to access a pod. only exposes pods to the k8s cluster
Node Port: makes a pod accessible from outside a cluster. usually only used for dev purposes
Load balancer: makes a pod accessible from outside the k8s cluster. this is the way to expose a pod to the world
External Name: redirects an in-cluster request to a CNAME url

### Lecture 77. Creating a NodePort Service

we create a new config file posts-srv.yaml

```
apiVersion: v1
kind: Service
metadata:
  name: posts-srv
spec:
  type: NodePort
  selector:
    app: posts ## find pods with this label to network
  ports:
    - name: posts
      protocol: TCP
      port: 4000 # export the port our app to an external port
      targetPort: 4000 # internal port of pod (in code)
```

nodePort is the port used to access nodePort service from outside the cluster. if not speced its random
we can see it with `kubectl describe service [srv name]`
if we use minikube we need to add the mikikubeIp to access the service from outside not the `localhost:nodePort/posts`

### Lecture 79. Setting Up Cluster IP Services

we will create a second pd to run event bus and use clusterIP to achieve comm between the 2 pods
a pod reaches another pod in the cluster using a clusterIP service
an internal cluster ip is variable so comm is upredictable
Workflow

- build an image for the event bus `docker build -t achliopa/event-bus .`
- push the image to dockerhub `docker push achliopa/event-bus`
- create a deployment for event bus (cp posts-depl and replace names) and deploy
- create a clusterip service for event bus and posts (in the same deployment file of app using --- much like nodePort config)
- wire it all up

### Lecture 82. How to Communicate Between Services

we need to alter code in axios AJAX calls to backend apis replacing localhost with proper hostname
we get service hostnames with command `kubectl get services` in our case http://event-bus-srv:4005
or http://posts-clusterip-srv:4000. so in code instead of localhost we give the service name

### Lecture 85. Adding Query, Moderation and Comments

Adding More Services (for comments, query, moderation)

- update urls in each to reach out to event bus service
- build image push to dockerhub
- create a deployment + clusterip service for each
- update the event bus to send again events to comments query and moderation

### Lecture 87. Load Balancer Services

the app has a frontend react client service (react app dev server) that is loaded to browser making backend requests to microservices
using nodeport is only for dev. it gets random port. loadbalacer service is the way
Load balancer Service: tells k8s to reach its provider and provision a load balancer. gets traffic in to a single pod
Ingress (Ingress Controller) : A pod with a set of routing rules to distribute traffic to other services
Load balancer is at the external boundary of cluster. ingress is inside between Loadbalancer and internal services
[documentation](https://kubernetes.github.io/ingress-nginx/deploy/#provider-specific-steps) for cloud provider specific commands

### Lecture 90. Installing Ingress-Nginx

ingress-nginx creates a load balancer service and Ingress. an alternative is kubernetes-ingress
[changes for k8s v1.22](https://kubernetes.io/docs/concepts/services-networking/ingress/) as v1 ingress API is used

### Lecture 92. Writing Ingress Config Files

we add ingress-srv.yaml

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-srv
  annotations:
    kubernetes.io/ingress.class: nginx # to help add routing rules
spec:
  rules:
    - host: posts.com
      http:
        paths:
          - path: /posts
            pathType: Prefix
            backend:
              service:
                name: posts-clusterip-srv
                port:
                  number: 4000
```

debugging tip: check status of port 80 `sudo lsof -i tcp:80`

### Lecture 94. Hosts File Tweak

we can host many apps in different domains in a k8 cluster
to make domain point to localhost or minikube ip we edit `/etc/hosts` adding `127.0.0.1 domain.com`

### Lecture 96. Deploying the React App

NOTE dockerizing create-react-app has a [bug](https://github.com/facebook/create-react-app/issues/8688)
make a tweek to its dockerfile

```
ROM node:alpine

# Add the following line
ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
```

### Lecture 97. Unique Route Paths

flesh ingress config. ingress cannot route based on http method. we need unique routes
we just add more paths in the ingress-srv.yaml pointing to other services in the cluster
a parametrical path `/posts/:id/comments` ingress route

```
- path: /posts/?(.*)/comments
  backend:
    service:
      name: comments-srv
      port:
        number: 4004
```

go from specific to generic routes generic / route is expressed `/?(.*)`

### Lecture 99. Introducing Skaffold

a tool to automate deployments

- automates many tasks in a K8s dev env
- makes it easy to update code in a pod running
- makes it easy to create/delete all objets tied to a project
- scaffold.dev

Not for production environment. setup with `scaffold.yaml` for the whole project

```
apiVersion: skaffold/v2alpha3
kind: Config
deploy:
  kubectl:
    manifests:
      - ./infra/k8s/*
build:
  local:
    push: false
  artifacts:
    - image: achliopa/client
      context: client
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: "src/**/*.js"
            dest: .
    - image: achliopa/comments
      context: comments
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: "*.js"
            dest: .
```

when we stop skaffold all temp files are deleted (clean project)
artifacts are maintained (rbuild on changes)
to start skaffold `skaffold dev` (manifest unknown messages at first run rerun)
it has challege detect changes in containers
stp skaffold with ctrl+c

## Section 5: Architecture of Multi-Service Apps

### Lecture 105. Big Ticket Items

Lessons from first dummy app

- real challenge in microservices is data
- many diff ways to share data between services. we focus on async comm
- async comm focuses on events and uses an event bus
- async comm strives to make micros 100% self sufficient. handle temp downtime on new service creation
- with docker easy to package services
- k8s difficult to stup bt paysdividents to deploy + scale services
  Challenges on first dummy app
- duplicated code => build a central lib as NPM module to share code
- hard to picture flow of events between services => define all events in the lib
- hard to remember properties of an event => write in typescript
- hard to test event flows => write tests
- k8s consumes resources => run k8s on cloud and setup a fast workflow
- event serialization? => write code for concurrency

We will now learn the correct way for production grade apps

code duplication: build a central NPM lib for reusable code
picture the flow of events: define all events in shared lib
hard to remember event properties: use typescript
hard to test event flows: write as many tests as possible
machine is struglisng with k8s: run on cloud
concurrency: use code to solve it

### Lecture 106. App Overview

Ticketing App

* users can list a ticket for an event (concert, sports) for sale
* other users can purchase the ticket
* any user can list tickets for sale and purchase tickets
* when a user attempts to purchase a ticket, the ticket is locked for 15 minutes. the user has 15 minutes to enter payment info
* while locked no other user can purchase the ticket. after 15 mins the ticket is unlocked
* ticket prices can be edited if unlocked

Resource Types

User:{ email: string; password: string }
Order: { userId: User.id ; status: enum ;  ticketId: Ticket.id ; expiresAt: Date }
Ticket: { title: string ; price: number ; userId: User.id ; order.Id: Order.id }
Charge: { orderId: Order.id ; status: enum ; amount: number; stripeId: string ; stripeRefundId: string }

## Section 25: [Appendix B] - Basics of Typescript

### Lecture 571. A First App

with typescript we can catch bugs while writing code not debugging

### Lecture 577. Types

Type: easy way to refer to the different properties + functions that a value has
Value: anythig we can assign to a var
Primitive types: number string boolean void
Object Types: functions, classes, objects, arrays

### Lecture 581. Type Annotations and Inference

Type Annotations: Code we add to tell TS what type of value a var will refer to `const apples: number = 5;`
Type Inference: TS tries to figure out what type of value a var refers to (declaration and initialization on same line)
how to annotate functions
```
const logNumber: (i:number) => void = (i: number) => {
  console.log(i);  
};
```
how to annotate obj literals
```
let point: { x: number; y: number } = {
    x: 10,
    y: 20
};

```

use type annotations when:
* we declare a var in one line and initialize it it further below
* we want a var to have a type that cant be inferred
* function returns any type and we want to clarify the val

`JSON.parse()` returns any type as depending on what we feed in returns a different type. typescript cannot predict the type
avoid variables with 'any' type at all cost. TS has no idea what that is
double type annotation `let numberAboveZero: boolean | number = false;`

### Lecture 590. More on Annotations Around Functions

type annotations for functions: codde we add to tell typescript what type of arguments a function will receive and what type of values it will returns
type inference for functions: typescript tries to figure out hat type of value a function will return
```
const add = (a: number, b: number): number => {
    return a + b;
};
```
output is inferred by TS by function implementation BAD practice. does not catch coding bugs
ES 2015 destructuring annotation
```
const logWeather = ({date, weather}: {date: Date, weather: string}): void => {
    console.log(date);
    console.log(weather);
    
};
```

### Lecture 595. Annotations Around Objects

Why we care?
* TS can do type inference when extrcting vlues from an array
* TS can prevent us from adding incompatible values to the array
* We can get help with 'map', 'forEach', 'reduce' functions
* Flexible - arrays can still contain multiple different types
When to use typed arrays? any time we need to represent a collection of records with some arbitrary sort order

### Lecture 600. Tuples in TypeScript

Tuple: array like structure where each element represents some property of a record
tuple annotation: specific order of types `const pepsi: [string, boolean, number] = ['brown', true, 40];`
type alias `type Drink = [string,boolean,number];`

### Lecture 603. Interfaces

Interfaces + Classes = strong code reuse in TS
Interfces: creates a new type, describing the property names and value types of an object
interfaces can have complex types inside or even function annotations
implementations of interfaces can have more attributes

General strattegy for reusable code in TS:
* create functions that accept arguments that are typed with interfces
* objects/classes can decide to 'implement' a given interface to work with a function

### Lecture 610. Classes

Classes: blueprint to create an object with some fields (values) and methods (functions) to represent an entity
class inheritance through `extends`
public: this method can be called anywhere any time
private: this method can only be called by other methods in this class
protected: this method can be called by other methods in this class or by other methods in child classes
when we overwrite a method we cannot change the modifier
TS field declaration in constructor `constructor(public color: string) {}`5
constructor is inherited

### Lecture 616. App Overview

basic web app to practice TS. it will generate a random User and Company with geolocation props and show them as pins on google maps
`npm install -g parcel-bundler` instead of ts-node to run TS in browser flawlessly
add a 'maps' folder. 
howw parcel bundler works: add an index.html file in folder, add a script tag for index.ts. feed index.html in parcel tool `parcel index.html`
we need 3 entities minimum User.ts Company.Ts Map.ts
*Install faker*
If you wish to use this library instead, you can install it by running: `npm install @faker-js/faker` You'll then need to update your imports: `import faker from '@faker-js/faker';`
In order to use the @types/faker with this new library, you must manually link them using a *.d.ts file:
```
// faker.d.ts
declare module '@faker-js/faker' {
  import faker from 'faker';
  export default faker;
}
```
in TS we can freely use JS and JS libraries. to use JS files with no warnings we use type definition files. some libs include type definition files
usually a `@types/{libname}` package exists to add types
in class definitions object props uninitialized are of type undefined
in TS we do not use export default. in React yes
info on how to add googlmaps lib in TS [doc](https://developers.google.com/maps/documentation/javascript/using-typescript#Module_Import)
when w add js files in html we need to let TS understand where it is. not like import. we need a @types/ packageinstalled with npm
TS checks if a class implements an interface