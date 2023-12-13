from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Product,Review
from base.serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view,permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger











@api_view(['GET'])
def getProducts(request):
    # print('request object :',request)
    query = request.query_params.get('keyword')


    if query  == None:
        query=""
    


    products = Product.objects.filter(name__icontains=query)  #if the name of the product contains any values in side of the query  filter it and return it back
    
    # print('product is ',products)
    page = request.query_params.get('pages')
    # print('page number is :',page)
    paginator = Paginator(products,8)  # this Paginatow will decide how many product are in one page second parameter is the thing will have to set 


    # print('paginator is :',paginator)
    try:
        products = paginator.page(page)
        # print('paginator product is :',products)
    except PageNotAnInteger:
        products =  paginator.page(1)
        # print('paginator product is except :',products)
    
    
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    
    if page == None:
        page=1

    page = int(page)
    
    serializer = ProductSerializer(products,many =  True)
    # print('serilizer output is :',serializer)
    return Response({'products':serializer.data,'page':page,'pages':paginator.num_pages})




@api_view(['GET'])
def getTopProducts(request):

    products = Product.objects.filter(ratings__gte=4).order_by('-ratings')[0:5] 
    serializer = ProductSerializer(products,many =  True)
    return Response(serializer.data)


    













@api_view(['GET'])
def getProduct(request,pk):
    # print('the pk is '+pk)
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many =  False)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product  = Product.objects.create(
        user = user,
        name = 'Sample Name',
        price = 0,
        brand = 'Sample Brand',
        countInStock = 0,
        category = 'Sample category',
        description = 'Sample Discription',
        ratings = 0,
    )
    serializer = ProductSerializer(product,many =  False)
    return Response(serializer.data)


@csrf_exempt
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    # print('the pk is '+pk)
    data =request.data

    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many =  False)
    return Response(serializer.data)




@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product is deleted')





@api_view(['POST'])
@permission_classes([IsAdminUser])
def uploadImage(request):
    data = request.data
    # print('LOOK BELOW FOR DATA')
    # print(data)
    product_id = data['product_id']


   

    product = Product.objects.get(_id=product_id)


    # Check if 'image' key exists in request.FILES
    if 'image' in request.FILES:
        product.image = request.FILES['image']
        product.save()
        return Response('Image was Uploaded')
    else:
        return Response('No image provided', status=400)







@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    print('look below for data from front end')
    print(data)

    # 1  senario if review alread exist stop the user to syop multiple reviews

    alreadyExist = product.review_set.filter(user=user).exists()

    if alreadyExist:
        content = {'detail':'Product Alread reviewed'}

        return Response (content,status=status.HTTP_400_BAD_REQUEST)
    # 2 No reating or 0
    if data['rating']== 0 :
        content = {'detail':'Select a ratings'}

        return Response (content,status=status.HTTP_400_BAD_REQUEST)

    # 3 create review

    else:
        review =Review .objects.create(
            user  = user,
            product = product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment']
        )


        reviews = product.review_set.all()
        product.numReviews = len(reviews)


        total = 0
        for i in reviews:
            total += i.rating


        product.rating = total/ len(reviews)
        product.save()

        return Response('Review is Added')
    



